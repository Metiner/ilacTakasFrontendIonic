import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {IlacTakasLibrary} from "../../services/IlacTakasLibrary";

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor ( private ilacTakasLibrary: IlacTakasLibrary){

  }

  onLogin(f: NgForm){
    this.ilacTakasLibrary.login(f).subscribe( response => {
      if(response){
        console.log("başarılı")
      }else{
        console.log("başarısız")
      }
    })
  }
}
