import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { IonicStorageModule } from "@ionic/storage";
import { IlacTakasLibrary } from "../services/IlacTakasLibrary";
import { HttpModule} from "@angular/http";
import { SignupPage } from "../pages/signup/signup";
import {WelcomePage} from "../pages/welcome/welcome";
import {HeaderComponent} from "../components/header/header";
import {TekliflerPage} from "../pages/teklifler/teklifler";
import {TeklifComponent} from "../components/teklif/teklif";
import {ProgressbarComponent} from "../components/progressbar/progressbar";
import {TeklifYaratPage} from "../pages/teklif-yarat/teklif-yarat";
import {TeklifDetayPage} from "../pages/teklif-detay/teklif-detay";
import {AlimlarimPage} from "../pages/alimlarim/alimlarim";
import {KarekodIslemleriPage} from "../pages/karekod-islemleri/karekod-islemleri";
import {GonderimlerimPage} from "../pages/gonderimlerim/gonderimlerim";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    SignupPage,
    WelcomePage,
    TekliflerPage,
    HeaderComponent,
    TeklifComponent,
    TeklifYaratPage,
    TeklifDetayPage,
    AlimlarimPage,
    KarekodIslemleriPage,
    GonderimlerimPage,
    ProgressbarComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages:false,
      backButtonText: 'GERİ'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    SignupPage,
    TeklifDetayPage,
    TekliflerPage,
    TeklifYaratPage,
    AlimlarimPage,
    KarekodIslemleriPage,
    GonderimlerimPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IlacTakasLibrary
  ]
})
export class AppModule {}
