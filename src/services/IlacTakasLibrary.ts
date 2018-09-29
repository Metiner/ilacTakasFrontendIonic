import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import {Http, RequestOptions, Headers} from "@angular/http";
import { Storage } from '@ionic/storage'
import {AlertController, Events, ToastController} from "ionic-angular";
import {Observable} from "rxjs/Observable";

@Injectable()
export class IlacTakasLibrary {

  /*apiEndpoint = "https://ilactakasbackend.herokuapp.com"*/
  apiEndpoint = "http://localhost:3000"
  isAuth= false

  eczane:any;
  token = ""

  constructor( private http: Http,
               private storage: Storage,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private eventCtrl: Events) {

  }

  login(f: NgForm):Observable<boolean> {

    let eczane = {
      email: f.value.username,
      password: f.value.password,
    }

    return new Observable( observer => {

      this.http.post(this.apiEndpoint + '/users/signin', eczane).subscribe( response => {

        let token = response.json().token
        let eczane = response.json().eczane

        this.publishEvent('menuChangeAuth', true)
        this.setSuccessAuthParams(eczane, token)
        observer.next(true)
        observer.complete()

      }, err => {
        observer.next(false)
        observer.complete()
      })
    })
  }

  logout(){
    this.storage.clear()
      .then( response => {
        this.isAuth = false
        this.publishEvent('menuChangeAuth', false)
        let eczane = {
          ad: ''
        }
        this.publishEvent('headerEczaneAdi', eczane)
      })
  }

  signup(f: NgForm){

    let eczane = {

      user: {
        email: f.value.email,
        password: f.value.password,
        password_confirmation: f.value.password
      },
      /*group_id: f.value.grup,*/


      eczane: {
        ad: f.value.username,
        gln_no: f.value.gln,
        grup_id: 1,
        bakiye: 0,
        actigi_teklif_sayisi: 0
      }
    }

    return this.http.post(this.apiEndpoint + '/users/signup.json', eczane)

  }

  create_teklif(teklif:any){
    return this.http.post(this.apiEndpoint + '/teklifs.json', teklif)
  }

  // Checks storage for auth, returns boolean
  checkAuth() {
    return new Promise((resolve, reject) => {
      this.storage.get('ilacTakasToken')
        .then(response => {
          if (response.status !== null) {
            let token = response
            this.storage.get('ilacTakasEczane')
              .then( eczane => {
                if (eczane !== null) {
                  this.isAuth = true
                  this.setSuccessAuthParams(eczane, token)
                  resolve(true)
                } else {
                  resolve(false)
                }
              })
          }
          else {
            resolve(false)
          }
        })
        .catch(err => {
          resolve(false)
        })
    })
  }

  public getIlaclarAutocomplete( searchParam) {

    if (searchParam.length > 3 && searchParam.length < 10) {
      // Lazily load input items
      return this.http.post(this.apiEndpoint + '/teklifs/get_ilac_auto_complete.json', {
        searchParam: searchParam.toUpperCase()
      })
    }
  }

  public alimYap(alim){
    return this.http.post(this.apiEndpoint + '/alims.json', alim)
  }

  public getEczaneler() {

    return this.http.get(this.apiEndpoint + '/eczanes')
  }

  public getGonderimlerim(eczane_id){
    return this.http.post(this.apiEndpoint + '/alims/get_gonderimlerim', { eczane_id: eczane_id})
  }

  public getEczaneBilgileri(eczane_id){
    return this.http.get(this.apiEndpoint+/eczanes/ + eczane_id)
  }

  public getTeklifler(){

    return this.http.get(this.apiEndpoint + '/teklifs.json')

  }

  formatDate(unformatted_date){
    let dateArray = unformatted_date.split("-");
    return dateArray[2].slice(0,2) + "/" + dateArray[1] + "/" + dateArray[0] + " " + dateArray[2].slice(3,11);
  }

  public getPharmacyGroups(){

    return this.http.get(this.apiEndpoint + '/getGroups')

  }
  public update_alim(aldigim){
    return this.http.put(this.apiEndpoint +"/alims/"+aldigim.id, aldigim)
  }

  public get_aldiklarim(){
    return this.http.get(this.apiEndpoint + '/eczanes/' + this.eczane.id + '/alims.json')
  }

  public setSuccessAuthParams(eczane: any, token: any){

    this.token = token
    this.eczane = eczane
    this.storage.set('ilacTakasToken', token)
    this.storage.set('ilacTakasEczane', this.eczane)

    this.publishEvent('headerEczaneAdi', this.eczane)

  }

  public showAlert(title:string,subTitle:string,buttons:any[]) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  public showToast(message: string,duration:number,position:string){

    const toast = this.toastCtrl.create({
      message : message,
      duration : duration,
      position : position
    })
    toast.present();
  }

  public publishEvent( eventName, args){
    this.eventCtrl.publish(eventName,args)
  }

  // to set request header for authentication
  private setHeader():RequestOptions{

    let opt:RequestOptions;
    let myHeaders: Headers = new Headers;


    myHeaders.set('Authorization','Bearer ' + this.token);

    opt = new RequestOptions({
      headers:myHeaders
    });

    return opt;
  }
}
