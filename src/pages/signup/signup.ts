import {Component} from "@angular/core";
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";
import {IonicPage, NavController} from "ionic-angular";
import {NgForm} from "@angular/forms";
import {LoginPage} from "../login/login";


@IonicPage()
@Component({

  selector: 'signup',
  templateUrl: 'signup.html'

})
export class SignupPage {

  gruplar: any = []

  constructor(private ilacTakasLibrary: IlacTakasLibrary,
              private navCtrl: NavController) {
    this.ilacTakasLibrary.getPharmacyGroups()
      .subscribe( response => {
        this.gruplar = response.json().groups
        console.log(this.gruplar)
      })
  }

  onSingup( f : NgForm){

    this.ilacTakasLibrary.signup(f)
      .subscribe( response => {
        console.log(response.json())
        this.navCtrl.push(LoginPage)
      }, error => {
        this.ilacTakasLibrary.showToast('İşlem başarısız.', 3000, 'bottom')
      })
  }
}
