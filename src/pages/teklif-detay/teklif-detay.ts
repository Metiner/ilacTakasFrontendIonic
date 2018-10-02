import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";
import {AlimlarimPage} from "../alimlarim/alimlarim";

/**
 * Generated class for the TeklifDetayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teklif-detay',
  templateUrl: 'teklif-detay.html',
})
export class TeklifDetayPage {

  teklif:any = {}
  eczane:any = {}
  ozel_eczane:any = {}

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ilacTakasLibrary: IlacTakasLibrary,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.teklif = this.navParams.data
    this.eczane = this.teklif.eczane
    if(this.teklif.eczaneye_ozel){
      this.ilacTakasLibrary.getEczaneBilgileri(this.teklif.ozel_eczane_id).subscribe( eczane_ozel => {
        this.ozel_eczane = eczane_ozel.json()
      })
    }
  }

  alimYap(){
    let stokta_kalan = ((parseFloat(this.teklif.alim_miktari) + parseFloat(this.teklif.mal_fazlasi)) - this.teklif.alinmis_miktar);
    let message =  "TEK SEFERDE EN FAZLA " + this.teklif.max_alim +" ADET, EN AZ " + this.teklif.min_alim + " ADET KADAR ALIM YAPABİLİRSİNİZ.\n STOKTA " + stokta_kalan + " KADAR ÜRÜN KALDI.";
    const prompt = this.alertCtrl.create({
      title: 'NE KADAR ALIM YAPMAK İSTİYORSUNUZ?',
      message: message,
      inputs: [
        {
          name: 'miktar',
          placeholder: 'Miktar'
        },
      ],
      buttons: [
        {
          text: 'Vazgeç',
          handler: data => {
          }
        },
        {
          text: 'Alım yap',
          handler: data => {

            if(this.teklif.alinmis_miktar + parseInt(data.miktar) <= this.teklif.mal_fazlasi + this.teklif.alim_miktari)
            {
              let alim = { alim: {
                eczane_id: this.ilacTakasLibrary.eczane.id,
                teklif_id: this.teklif.id,
                miktar: parseInt(data.miktar)

              }}

              this.ilacTakasLibrary.alimYap(alim).subscribe(response => {
                if(response.json().status === "ok"){
                  Promise.all([this.ilacTakasLibrary.add_bakiye(this.eczane.id, parseFloat(this.teklif.net_fiyat) * parseFloat(data.miktar)),
                    this.ilacTakasLibrary.add_bakiye(this.ilacTakasLibrary.eczane.id, -parseFloat(this.teklif.net_fiyat) * parseFloat(data.miktar))])
                    .then( response => {
                      response.forEach(el => {
                        if(el.json().status !== 'ok'){
                          this.ilacTakasLibrary.showToast("Bakiye eklenirken hata oluştu", 3000, "bottom");
                          return
                        }
                        else{
                          this.ilacTakasLibrary.showToast("Alım yapıldı.",3000, "bottom");
                          this.navCtrl.push(AlimlarimPage)
                        }
                      })
                    })
                }else{
                  this.ilacTakasLibrary.showToast("Alım yaparken hata oluştu", 3000, "bottom");
                }
              },error => {
                console.log(error)
              });
            }
            else
            {
              this.ilacTakasLibrary.showToast("YETERLİ SAYIDA ÜRÜN KALMADI", 3000, "bottom");
            }
          }
        }
      ]
    });
    prompt.present();
  }

  is_it_my_firsat(){
    return this.ilacTakasLibrary.eczane.id === this.eczane.id
  }

}
