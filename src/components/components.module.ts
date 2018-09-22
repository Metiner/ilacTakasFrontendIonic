import { NgModule } from '@angular/core';
import { TeklifComponent } from './teklif/teklif';
import {HeaderComponent} from "./header/header";
import { ProgressbarComponent } from './progressbar/progressbar';
@NgModule({
	declarations: [TeklifComponent, HeaderComponent,
    ProgressbarComponent],
	imports: [],
	exports: [TeklifComponent, HeaderComponent,
    ProgressbarComponent]
})
export class ComponentsModule {}
