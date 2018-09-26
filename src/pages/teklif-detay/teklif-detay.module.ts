import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeklifDetayPage } from './teklif-detay';

@NgModule({
  declarations: [
    TeklifDetayPage,
  ],
  imports: [
    IonicPageModule.forChild(TeklifDetayPage),
  ],
})
export class TeklifDetayPageModule {}
