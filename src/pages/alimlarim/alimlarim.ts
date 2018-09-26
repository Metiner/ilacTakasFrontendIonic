import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";

/**
 * Generated class for the AlimlarimPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alimlarim',
  templateUrl: 'alimlarim.html',
})
export class AlimlarimPage {

  aldiklarim:any=[];
  constructor(private ilacTakasLibrary: IlacTakasLibrary) {

  }

  ionViewWillEnter(){
    this.ilacTakasLibrary.get_aldiklarim().subscribe( response => {
      if(response.json().status === "ok")
      {
        this.aldiklarim = response.json().alims;
      }
    })
  }

  formatDate(unformatted_date){
    let dateArray = unformatted_date.split("-");
    return dateArray[2].slice(0,2) + "/" + dateArray[1] + "/" + dateArray[0] + " " + dateArray[2].slice(3,11);
  }

}
