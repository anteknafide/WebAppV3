import { Component} from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

import { APIService } from '../../api.service';

import { CategoriesComponent,LoggedIn } from '../../categories/categories.component';

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
        console.log("Użytkownik pomyslnie zalogowany: " + this.login + " - " + this.password);
        
        //Plan A
        // LoggedIn();

        //Plan B
        //tu nie działa bo nie moge wywołać funkcji którą exportuje, parametr categoriescomponent wymaga APIservice
        // const myComponentInstance  = new CategoriesComponent();
        // LoggedIn(myComponentInstance);


        this.trasownik.navigateByUrl('/categories')
      },
      (e) => {
        console.error(e)
      }
    )
  }
}
