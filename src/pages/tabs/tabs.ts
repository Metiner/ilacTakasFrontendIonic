import { Component } from '@angular/core';
import {TekliflerPage} from "../teklifler/teklifler";
import {TeklifYaratPage} from "../teklif-yarat/teklif-yarat";
@Component({
  selector: 'page-tabs',
  template: `

    
    <ion-tabs tabsPlacement ="bottom">
      
      <ion-tab   [root]="tekliflerPage" tabIcon="list-box" tabTitle= "Teklifler">
      </ion-tab>
      <ion-tab   [root]="teklifYarat" tabIcon="add-circle" tabTitle= "Teklif Oluştur">
      </ion-tab>
      
    </ion-tabs>
  `,
})
export class TabsPage {

  tekliflerPage = TekliflerPage
  teklifYarat = TeklifYaratPage

  constructor() {
  }




}
