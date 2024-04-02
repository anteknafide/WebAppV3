import { Component } from '@angular/core';
import { Item } from '../item/item.model';
import { APIService } from '../api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  // <isDisplayCategory> odpowiada za to czy [category] jest wyświetlany czy nie
  isDisplayCategory = false;
    // <isDisplayHats> odpowiada za to czy [hats] jest wyświetlany czy nie
    isDisplayHats = true;

    items :Item[] = []
    nowyItem :Item = {
      name: '',
      description: '',
      price: '',
      category: 'Hat'
    }
  constructor(private mojaUsluga :APIService) {}
    
  toggleCategoriesDisplay()
  {
    this.isDisplayCategory = !this.isDisplayCategory;
  }

  toggleHatsDisplay()
  {
    this.isDisplayCategory = true;
    this.isDisplayHats = !this.isDisplayHats;
  }


  dodajItem() {
  
    // debugger
    this.mojaUsluga.addNewItem(this.nowyItem).subscribe(
      (res) => {
        this.items.push({...this.nowyItem})
        console.log('Dodano item: ', res)
      },
      (err) => {
        console.error("Błąd przy dodawaniu itema: " + err.message)
      }
    )
  }
  itemUsuniety(item :Item) {
    this.items = this.items.filter(b => b !== item)
  }
  ngOnInit() {
    const localData = localStorage.getItem('singupUsers')
    this.singupUsers.push(this.adminObj);
    if(localData != null)
    {
      this.singupUsers == JSON.parse(localData)
    }

    this.mojaUsluga.getAllItems().subscribe(
      (dane) => { this.items = dane },
      (error) => { console.error(error) }
    )
  }

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
