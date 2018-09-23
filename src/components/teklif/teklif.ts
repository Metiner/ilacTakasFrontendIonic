import {Component, Input} from '@angular/core';
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";

@Component({
  selector: 'teklif',
  templateUrl: 'teklif.html'
})
export class TeklifComponent {


  @Input() teklif: any
  teklifBakiyeYuzdesi = 0
  karlilik = ""
  eczane:any ={}
  constructor(private ilacTakasLibrary: IlacTakasLibrary) {
  }

  ngOnInit(){
    this.teklifBakiyeYuzdesi = this.teklif.alinmis_miktar * this.teklif.hedeflenen_alim / 100
    this.karlilik = (this.teklif.net_fiyat / this.teklif.depo_fiyati * 100).toFixed()
    this.getEczaneAdi(this.teklif.eczane_id)
  }

  getEczaneAdi(eczane_id){
    this.ilacTakasLibrary.getEczaneBilgileri(eczane_id).subscribe( response => {
      this.eczane = response.json()
    },error =>{

    })
  }
}
