import {Component, Input} from "@angular/core";
import {Events} from "ionic-angular";

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() hideBackButton = false;
  eczane={
    ad:""
  };
  constructor(private eventCtrl: Events){
    this.eventCtrl.subscribe('headerEczaneAdi', ( eczane ) => {
      this.eczane = eczane
      this.eventCtrl.unsubscribe('headerEczaneAdi')
    })
  }
}
