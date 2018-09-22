import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TekliflerPage } from './teklifler';

@NgModule({
  declarations: [
    TekliflerPage,
  ],
  imports: [
    IonicPageModule.forChild(TekliflerPage),
  ],
})
export class TekliflerPageModule {}
