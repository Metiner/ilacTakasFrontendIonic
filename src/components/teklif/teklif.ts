import {Component, Input} from '@angular/core';

@Component({
  selector: 'teklif',
  templateUrl: 'teklif.html'
})
export class TeklifComponent {


  @Input() teklif: any
  teklifBakiyeYuzdesi = 0
  karlilik = ""
  constructor() {
  }

  ngOnInit(){
    this.teklifBakiyeYuzdesi = this.teklif.alinan * this.teklif.hedeflenenAlim / 100
    this.karlilik = (this.teklif.netFiyat / this.teklif.depoFiy * 100).toFixed()

  }
}
