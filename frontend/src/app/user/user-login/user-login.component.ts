import { Component} from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

import { toggleLoginDisplay } from '../../categories/categories.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})

export class UserLoginComponent {
  login :string
  password :string


  constructor(
    private autoryzacja :AuthService,
    private trasownik :Router
  ) {}


  zaloguj() {
    const daneLogowania = {
      login: this.login,
      password: this.password
    }
    this.autoryzacja.loginUser(daneLogowania).subscribe(
      () => {
        this.trasownik.navigate(['/'])
        console.log("Użżżżżżżżżytkownik pomyslnie zalogowany: " + this.login + " - " + this.password);
        toggleLoginDisplay();
      },
      (e) => {
        console.error(e)
      }
    )
  }

  zmienDisplay()
  {
    toggleLoginDisplay();
  }
}
