import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";
import {LoginPage} from "../login/login";

/**
 * Generated class for the TekliflerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teklifler',
  templateUrl: 'teklifler.html',
})
export class TekliflerPage {

  teklifler: any;

  constructor(private ilacTakasLibrary: IlacTakasLibrary,
              private navCtrl: NavController) {



  }
  ionViewWillEnter(){
    this.ilacTakasLibrary.checkAuth().then( response => {
      if(response){
        this.ilacTakasLibrary.getTeklifler()
          .subscribe( response => {
            this.teklifler = response.json().teklifler
          }, error => {
            this.navCtrl.push(LoginPage)
          })
      }
    })

  }


}
