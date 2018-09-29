import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";

/**
 * Generated class for the KarekodIslemleriPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-karekod-islemleri',
  templateUrl: 'karekod-islemleri.html',
})
export class KarekodIslemleriPage {


  data: any = {}
  showKaydetButon = false;
  girilenKarekodlar = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ilacTakasLibrary: IlacTakasLibrary) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.data;
    this.setKarekodlarToTextArea(this.data.data.karekodlar)
    this.showKaydetButon = this.data.from === 'gonderimlerim'
    console.log(this.data)
  }

  hepsiniKopyala() {

    const el = document.createElement('textarea');
    el.value = this.girilenKarekodlar;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

  }

  setKarekodlarToTextArea(karekodlar){
    if(karekodlar){
      for(let i=0;i<karekodlar.length;i++){
        this.girilenKarekodlar += karekodlar[i]
        if(i !== karekodlar.length){
          this.girilenKarekodlar += "\n"
        }
      }
    }
  }

  karekodlariKaydet() {
    let karekodlar = this.girilenKarekodlar.trim().split("\n")
    this.data.data.karekodlar = karekodlar;
    if (karekodlar.length !== parseInt(this.data.data.miktar)) {
      this.ilacTakasLibrary.showToast("KAREKOD SAYISI UYUŞMUYOR.",3000,"bottom")
    } else {
        this.ilacTakasLibrary.update_alim(this.data.data).subscribe( response => {
          if(response.json().status === "ok"){
            this.ilacTakasLibrary.showToast("KAYDEDİLDİ", 3000, 'bottom');
            this.navCtrl.pop();
          }
        }, error => {
          this.ilacTakasLibrary.showToast( error, 3000, 'bottom');
        })
    }
  }
}
