import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BakiyelerPage } from './bakiyeler';

@NgModule({
  declarations: [
    BakiyelerPage,
  ],
  imports: [
    IonicPageModule.forChild(BakiyelerPage),
  ],
})
export class BakiyelerPageModule {}
