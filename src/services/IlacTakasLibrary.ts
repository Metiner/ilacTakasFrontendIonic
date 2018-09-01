import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Http } from "@angular/http";
import { Storage } from '@ionic/storage'
import  jwt  from 'jsonwebtoken'
import {AlertController, ToastController} from "ionic-angular";
import {Observable} from "rxjs/Observable";

@Injectable()
export class IlacTakasLibrary {

  apiEndpoint = "https://ilactakasbackend.herokuapp.com"

  user: {
    name: ""
  }

  constructor( private http: Http,
               private storage: Storage,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController) {

  }

  login(f: NgForm):Observable<boolean> {

    let eczane = {
      email: f.value.username,
      password: f.value.password,
    }

    return new Observable( observer => {

      this.http.post(this.apiEndpoint + '/user/login', eczane).subscribe( response => {

        this.setSuccessAuthParams(response)
        observer.next(true)
        observer.complete()



      }, err => {
        this.showToast("Başarısız giriş, lütfen bilgileri kontrol ediniz.", 3000, 'bottom' )
        observer.next(false)
        observer.complete()
      })
    })


  }

  setSuccessAuthParams(response: any){

    this.storage.set('ilacTakasToken', 'Bearer ' + response.json().token)
    this.user = jwt.decode(response.json().token).user

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
}
