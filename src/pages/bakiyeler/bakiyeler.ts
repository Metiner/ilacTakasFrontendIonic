import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";

/**
 * Generated class for the BakiyelerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bakiyeler',
  templateUrl: 'bakiyeler.html',
})
export class BakiyelerPage {

  bakiyeler:any = [];
  constructor(private ilacTakasLibrary: IlacTakasLibrary) {
  }

  ionViewWillEnter(){
    this.ilacTakasLibrary.get_bakiyeler().subscribe( response => {
      if(response.json().status === 'ok')
      {
        this.bakiyeler = response.json().bakiyeler
      }
      else{
        this.ilacTakasLibrary.showToast("Bakiye listesi getirilirken hata oluştu", 3000, 'bottom')
      }
    })
  }

}
