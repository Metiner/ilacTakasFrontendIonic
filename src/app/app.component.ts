import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";

import { TabsPage } from '../pages/tabs/tabs';
import {IlacTakasLibrary} from "../services/IlacTakasLibrary";
import { Storage } from '@ionic/storage'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  @ViewChild('content') nav: NavController

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private ilacTakasLibrary: IlacTakasLibrary,
              private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.initializeApp()
    });
  }

  initializeApp(){
    if(!this.checkAuth()){
      this.nav.push(LoginPage)
    }
  }

  openLoginPage(){
    this.nav.push(LoginPage)
    this.menuCtrl.close()
  }

  // Checks storage for auth, returns boolean
  checkAuth(){
    this.storage.get('ilacTakasToken')
      .then( response => {
        if(response !== null){
          this.ilacTakasLibrary.user = response
          return true
        }
        else{
          return false
        }
      })
      .catch( err => {
        console.log(err)
      })
  }
}
