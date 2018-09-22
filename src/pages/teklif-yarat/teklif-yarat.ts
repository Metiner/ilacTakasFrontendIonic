import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";

/**
 * Generated class for the TeklifYaratPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teklif-yarat',
  templateUrl: 'teklif-yarat.html',
})
export class TeklifYaratPage {


  ilaclar = []
  secilenIlac = ""
  secilen_eczane:any

  eoy = false
  hag = false
  minimumAlim:any
  maxAlim:any
  yemekCekiEldenNakit:any
  ekstraUrun:any
  etiketFiyati:any
  depoFiyati:any
  malFazlasi:any
  alimMiktari:any
  netFiyat:any
  baslangicTarihi:any
  bitisTarihi:any

  eczaneler = []

  constructor(private ilacTakasLibrary: IlacTakasLibrary) {
  }


  teklifYarat(f:NgForm){
      if(this.eoy === true){
        if(this.secilen_eczane === undefined){
          this.ilacTakasLibrary.showToast("Lütfen eczane seçiniz.", 3000, 'bottom')
        }else if( this.minimumAlim > f.value.maxAlim){
          this.ilacTakasLibrary.showToast("Minumum alım, maksimumdan büyük olamaz.", 3000, 'bottom')
        }else if( f.value.baslangicTarihi > f.value.bitisTarihi){
          let bitis = new Date(f.value.bitisTarihi)
          let baslangic = new Date(f.value.baslangicTarihi)
          if( bitis < baslangic){
            this.ilacTakasLibrary.showToast('Talep başlangıç tarihi, bitisten büyük olamaz.', 3000, 'bottom')
          }
        }else if(f.value.etiketFiyati < f.value.depoFiyati){
          this.ilacTakasLibrary.showToast('Etiket fiyati, depo fiyatindan küçük olamaz.', 3000, 'bottom')
        }
        else{
          this.calculateNetPrice(f)

          let teklif = {
            teklif: {
              barcode: f.value.ilacAdi,
              alim_miktari: f.value.alimMiktari,
              mal_fazlasi: f.value.malFazlasi,
              min_alim: f.value.minimumAlim,
              max_alim: f.value.maxAlim,
              baslangic_tarihi: f.value.baslangicTarihi,
              bitis_tarihi: f.value.bitisTarihi,
              hedeflenen_alim: f.value.hedeflenenAlim,
              son_kul_tarihi: f.value.sonKullanmaTarihi,
              etiket_fiyati: f.value.etiketFiyati,
              depo_fiyati: f.value.depoFiyati,
              hedeflenen_alim_gecilsin: f.value.hag,
              eczaneye_ozel: f.value.eoy,
              ozel_eczane_id: f.value.secilen_eczane,
              net_fiyat: this.netFiyat,
              yemek_ceki_elden_nakit: f.value.yemekCekiEldenNakit,
              ekstra_urun: f.value.ekstraUrun
            }
          }
          this.create_teklif(teklif)
        }
      }else{
        this.calculateNetPrice(f)

        let teklif = {
          teklif: {
            barcode: f.value.ilacAdi,
            alim_miktari: f.value.alimMiktari,
            mal_fazlasi: f.value.malFazlasi,
            min_alim: f.value.minimumAlim,
            max_alim: f.value.maxAlim,
            baslangic_tarihi: f.value.baslangicTarihi,
            bitis_tarihi: f.value.bitisTarihi,
            hedeflenen_alim: f.value.hedeflenenAlim,
            son_kul_tarihi: f.value.sonKullanmaTarihi,
            etiket_fiyati: f.value.etiketFiyati,
            depo_fiyati: f.value.depoFiyati,
            hedeflenen_alim_gecilsin: f.value.hag,
            eczaneye_ozel: f.value.eoy,
            net_fiyat: this.netFiyat,
            yemek_ceki_elden_nakit: f.value.yemekCekiEldenNakit,
            ekstra_urun: f.value.ekstraUrun
          }
        }
        this.create_teklif(teklif)
      }
  }

  create_teklif(teklif:any){


    this.ilacTakasLibrary.create_teklif(teklif).subscribe( response => {
      console.log(response)
    }, error2 => {

    })
  }

  getIlaclar(ev: any) {

    let searchParam = ev.value

    this.ilaclar = []

    if(searchParam.length > 3 && searchParam.length < 20 ){

      this.ilacTakasLibrary.getIlaclarAutocomplete(searchParam)
        .subscribe(res => {
          res.json().ilaclar.map(element=>{
            this.ilaclar.push(element["ILAC ADI"])
          })
        },error => {
          console.log(error)
        })
    }
  }

  onSelectIlac(ilac){
    this.secilenIlac = ilac
    this.ilaclar.length = 0
  }

  getEczaneler(){

    this.ilacTakasLibrary.getEczaneler()
      .subscribe( response => {
        this.eczaneler = response.json().eczaneler
        this.eczaneler = this.eczaneler.filter( eczane => {
          return eczane.ad !== this.ilacTakasLibrary.eczane.ad
        })
      })
  }

  calculateNetPrice(f){


    let temp;
    let temp2;
    let temp3 = 0;
    if(f.value.yemekCekiEldenNakit !== 0 && f.value.yemekCekiEldenNakit !== "") {
      temp3 += parseFloat(f.value.yemekCekiEldenNakit) / parseFloat(f.value.depoFiyati)
    }
    if(f.value.ekstraUrun !== 0 && f.value.ekstraUrun !== ""){
      let temp4 = parseFloat(f.value.ekstraUrun) * parseFloat(f.value.etiketFiyati)
      temp3 += temp4 / parseFloat(f.value.depoFiyati)
    }

    let returnValue:any;

    if(f.value.malFazlasi !== null && f.value.alimMiktari !== null){
      temp = parseFloat(f.value.malFazlasi) + temp3 + parseFloat(f.value.alimMiktari)
    }


    temp2 = (parseFloat(f.value.depoFiyati) / temp ) * parseFloat(f.value.alimMiktari)
    if(isNaN(temp2)){
      this.ilacTakasLibrary.showToast("Lütfen alim miktari, mal fazlası ve depo fiyatlarını eksiksiz doldurun.", 3000, 'bottom')
    }else{
      returnValue = temp2.toFixed(2)
      this.netFiyat = returnValue;
      this.ilacTakasLibrary.showToast("Net fiyat: " + this.netFiyat, 3000, 'bottom')
    }

  }

}
