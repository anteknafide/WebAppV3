import { Component } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

//nwm dlaczego nie chce zimportowac, przez to przycisk "x" nie chce działać i trzeba zamykać przez przycisk rejestrowania
import { toggleSignupDisplay } from '../../categories/categories.component';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  nowyUser :User = {
    login: "",
    password: ""
  }
  password2 = ""

  PASSError = false
  POSTError: boolean;

  constructor(
    private autoryzacja :AuthService,
    private trasownik :Router
  ) {}

  zarejestruj() {
    if(this.nowyUser.password === this.password2) {
      this.autoryzacja.registerUser(this.nowyUser).subscribe(
        () => {
          this.trasownik.navigate(['/logowanie'])
        },
        (error) => {
          this.POSTError = true
          console.error(error)
        }
      )
    } else {
      console.log("dzialaelse");
      this.PASSError = true
    }
  }
}
