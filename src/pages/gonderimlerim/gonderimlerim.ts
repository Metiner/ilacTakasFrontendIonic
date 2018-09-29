import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";
import {KarekodIslemleriPage} from "../karekod-islemleri/karekod-islemleri";

/**
 * Generated class for the GonderimlerimPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gonderimlerim',
  templateUrl: 'gonderimlerim.html',
})
export class GonderimlerimPage {

  gonderimlerim:any = []
  constructor(public navCtrl: NavController,
              private ilacTakasLibrary: IlacTakasLibrary) {
  }

  ionViewWillEnter() {
    this.ilacTakasLibrary.getGonderimlerim(this.ilacTakasLibrary.eczane.id).subscribe(response => {
      if(response.json().status === "ok"){
        this.gonderimlerim = response.json().gonderimlerim;
      }
    })
  }
  openKarekodIslemleriPage(gonderecegim){
    let data = {
      from: 'gonderimlerim',
      data: gonderecegim
    }
    this.navCtrl.push(KarekodIslemleriPage, data)
  }

  gonder(gonderecegim){
    gonderecegim.gonderildi = true;
    this.ilacTakasLibrary.update_alim(gonderecegim).subscribe(response => {
      if( response.json().status === "ok")
      {

      }
    }, error => {
      this.ilacTakasLibrary.showToast("HATA:" + error, 3000, "bottom")
    })
  }
}
