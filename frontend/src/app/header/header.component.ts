import { Component } from '@angular/core';
import { APIService } from '../api.service';
import { Item } from '../item/item.model';
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
  userLoggedIn=true;
  adminDisplay=false;
  singupUsers :any[] = [];
  loginObj:any = {
    username: '',
    password: ''
  };
  // signupObj:any = {
  //   username: '',
  //   password: ''
  // };

  adminObj:any = {
    username: 'admin',
    password: 'admin'
  };

  toggleLoginDisplay()
  {
    this.isDisplayLogin = !this.isDisplayLogin;
  }

  toggleCheckoutDisplay()
  {
    this.isDisplayCheckout = !this.isDisplayCheckout;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const localData = localStorage.getItem('singupUsers')
    this.singupUsers.push(this.adminObj);
    if(localData != null)
    {
      this.singupUsers == JSON.parse(localData)
    }
  }
  onLogin()
  {
    // debugger
    // console.log(this.singupUsers)
      const userExist = this.singupUsers.find(m=>m.username==this.loginObj.username && m.password==this.loginObj.password)
      if(userExist){
        this.userLoggedIn=true;
        alert('User logged(locked) in')
      }else{
        alert('Error')
      }
  }
  onLogout(){
    alert('user logged out')
    // localStorage.clear();
    // this.loginObj={
    //   username:'',
    //   password:''
    // }
    this.userLoggedIn=false;
  }
  toggleAdminDisplay(){
    this.adminDisplay=!this.adminDisplay;
  }
  onSingUp()
  {
    // this.signupObj=this.loginObj
    // localStorage.setItem('singupUsers',JSON.stringify(this.singupUsers))
    // this.signupObj={
    //   username:'',
    //   password:''
    // }
    // localStorage.clear();
  }

}

