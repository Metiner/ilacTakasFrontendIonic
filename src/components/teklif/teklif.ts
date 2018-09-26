import {Component, Input} from '@angular/core';
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";
import {NavController} from "ionic-angular";
import {TeklifDetayPage} from "../../pages/teklif-detay/teklif-detay";

@Component({
  selector: 'teklif',
  templateUrl: 'teklif.html'
})
export class TeklifComponent {


  @Input() teklif: any;
  teklifBakiyeYuzdesi = 0;
  karlilik = "";
  constructor(private ilacTakasLibrary: IlacTakasLibrary,
              private nav: NavController) {
  }


  ngOnInit(){
    this.teklifBakiyeYuzdesi = parseInt((this.teklif.alinmis_miktar * 100 / (this.teklif.alim_miktari + this.teklif.mal_fazlasi)).toFixed());
    this.karlilik = (this.teklif.net_fiyat / this.teklif.depo_fiyati * 100).toFixed();
  }

  goToDetay(teklif){
    teklif.karlilik = this.karlilik
    teklif.teklifBakiyeYuzdesi = this.teklifBakiyeYuzdesi

    this.nav.push(TeklifDetayPage, teklif)
  }
}
