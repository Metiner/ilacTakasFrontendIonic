import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";
import {IonicPage, NavController} from "ionic-angular";
import {SignupPage} from "../signup/signup";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor ( private ilacTakasLibrary: IlacTakasLibrary,
                private navCtrl: NavController){

  }

  onLogin(f: NgForm){
    this.ilacTakasLibrary.login(f).subscribe( response => {

      if(response){
        this.navCtrl.push(TabsPage)
      }else{
        this.ilacTakasLibrary.showToast("Başarısız giriş, lütfen bilgileri kontrol ediniz.", 3000, 'bottom' )
      }
    })
  }

  onSubmitPage(){
    this.navCtrl.push(SignupPage)
  }
}
