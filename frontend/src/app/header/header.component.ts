import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  // <isDisplayLogin> odpowiada za to czy [login from] jest wyświetlany czy nie
  isDisplayLogin = true;
    // <isDisplayLogin> odpowiada za to czy [checkout from] jest wyświetlany czy nie
  isDisplayCheckout = true;


  toggleLoginDisplay()
  {
    this.isDisplayLogin = !this.isDisplayLogin;
  }

  toggleCheckoutDisplay()
  {
    this.isDisplayCheckout = !this.isDisplayCheckout;
  }


}

