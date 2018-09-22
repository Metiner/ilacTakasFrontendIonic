import {Component, ViewChild} from '@angular/core';
import {Events, MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";

import { TabsPage } from '../pages/tabs/tabs';
import {IlacTakasLibrary} from "../services/IlacTakasLibrary";
import {TeklifYaratPage} from "../pages/teklif-yarat/teklif-yarat";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = TabsPage;
  @ViewChild('nav') nav: NavController
  isAuth = false

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private ilacTakasLibrary: IlacTakasLibrary,
              private eventCtrl: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.initializeApp()


    });
  }

  initializeApp() {

    this.ilacTakasLibrary.checkAuth()
      .then( response => {
        if(response){
          this.isAuth = true
          //navigates to tabs page.
        }else{
          this.nav.push(LoginPage)
        }
      })

    this.eventCtrl.subscribe('menuChangeAuth', response => {
      this.isAuth = response
    })
  }

  openLoginPage() {
    this.nav.push(LoginPage)
    this.menuCtrl.close()
  }

  logOut(){
    this.ilacTakasLibrary.logout()
    this.nav.push(LoginPage)
    this.menuCtrl.close()
  }

}
