import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";
import {KarekodIslemleriPage} from "../karekod-islemleri/karekod-islemleri";

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
  constructor(private ilacTakasLibrary: IlacTakasLibrary,
              private navCtrl: NavController) {

  }

  ionViewWillEnter(){
    this.ilacTakasLibrary.get_aldiklarim().subscribe( response => {
      if(response.json().status === "ok")
      {
        this.aldiklarim = response.json().alims;
      }
    })
  }
  openKarekodIslemleriPage(alim){
    let data = {
      from: 'alimlarim',
      data: alim
    }
    this.navCtrl.push(KarekodIslemleriPage,data)
  }

  teslim_al(aldigim){
    aldigim.teslim_alindi = true;
    this.ilacTakasLibrary.update_alim(aldigim).subscribe( response => {
      if(response.json().status === "ok")
      {
        this.ilacTakasLibrary.showToast("TESLİM ALINDI", 3000, "bottom")
      }
    }, error => {
      this.ilacTakasLibrary.showToast("HATA" + error , 3000, "bottom")
    })
  }
}
