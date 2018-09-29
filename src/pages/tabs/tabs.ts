import { Component } from '@angular/core';
import {TekliflerPage} from "../teklifler/teklifler";
import {TeklifYaratPage} from "../teklif-yarat/teklif-yarat";
import {AlimlarimPage} from "../alimlarim/alimlarim";
import {GonderimlerimPage} from "../gonderimlerim/gonderimlerim";
@Component({
  selector: 'page-tabs',
  template: `

    
    <ion-tabs tabsPlacement ="bottom">
      
      <ion-tab   [root]="tekliflerPage" tabIcon="list-box" tabTitle= "Teklifler">
      </ion-tab>
      <ion-tab   [root]="teklifYaratPage" tabIcon="add-circle" tabTitle= "Teklif Oluştur">
      </ion-tab>
      <ion-tab   [root]="alimlarimPage" tabIcon="bookmarks" tabTitle= "Aldıklarım">
      </ion-tab>
      <ion-tab   [root]="gonderimlerimPage" tabIcon="share-alt" tabTitle= "Gönderimlerim">
      </ion-tab>

    </ion-tabs>
  `,
})
export class TabsPage {

  tekliflerPage = TekliflerPage;
  teklifYaratPage = TeklifYaratPage;
  alimlarimPage = AlimlarimPage;
  gonderimlerimPage = GonderimlerimPage;

  constructor() {
  }




}
