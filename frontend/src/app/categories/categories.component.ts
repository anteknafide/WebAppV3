import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../item/item.model';
import { APIService } from '../api.service';

// import { cartItems } from '../item/item.component';
import { WypelnijKoszyk } from '../item/item.component';
import { WyczyscKoszyk } from '../item/item.component';

//Plan A
// var isDisplayLogin:boolean = true;
// var userLoggedIn=false;

// export function LoggedIn(){
//   userLoggedIn=true;
//   isDisplayLogin = false;
//   console.log(`Zmieniono display: ${isDisplayLogin}`);
// }

// export function LoggedOut(){
//   isDisplayLogin = false;
//   userLoggedIn=false;
//   console.log(`Zmieniono display: ${isDisplayLogin}`);
// }

//Plan B
export function LoggedIn(componentInstance: CategoriesComponent){
  componentInstance.isDisplayLogin = false;
  componentInstance.userLoggedIn=true;
  console.log(`Zmieniono display: ${componentInstance.isDisplayLogin}`);
}

export function LoggedOut(componentInstance: CategoriesComponent){
  componentInstance.isDisplayLogin = false;
  componentInstance.userLoggedIn=false;
  console.log(`Zmieniono display: ${componentInstance.isDisplayLogin}`);
}



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
    public isDisplayLogin:boolean = true;
    public isDisplaySignup:boolean = true;
    public userLoggedIn=false;
    public adminDisplay=false;


    items :Item[] = []
    nowyItem :Item = {
      name: '',
      description: '',
      price: '',
      category: 'Hat'
    }
  constructor(private mojaUsluga :APIService) {}
  
  dodajItem() {
    
    //to tez moze byc tam gdzie sie wczytuje z bazy na strone, bedzie po patrzec na category po value napisu i zmieniac src na podstawie tego
    // let selectedCategory = (<HTMLSelectElement>document.getElementById('organization')).value;
    // switch (selectedCategory){
    //   case "Hat":
    //     this.nowyItem.category = "Hat"
    //     break;
    //   case "T-shirt":
    //     this.nowyItem.category = "T-shirt"
    //     break;
    //   case "Pants":
    //       this.nowyItem.category = "Pants"
    //       break;
    // }

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

    isDisplayCheckout = true;
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

  toggleSignupDisplay()
  {
     this.isDisplaySignup = !this.isDisplaySignup;
  }

  //naprawic- bo koszyk nie chce sie wczytac po otwarciu koszyka
  toggleCheckoutDisplay()
  {
    this.isDisplayCheckout = !this.isDisplayCheckout
    WypelnijKoszyk()
  }

  ClearCart(){
    WyczyscKoszyk()
  }

  onLogin()
  {
      //to nie działa, idk dlaczego
      // const userExist = this.singupUsers.find(m=>m.username==this.loginObj.username && m.password==this.loginObj.password)
      // if(userExist){
      //   this.userLoggedIn=true;
      //   alert('User logged(locked) in')
      //   LoggedIn(this)
      // }else{
      //   alert('Error')
      // }

      LoggedIn(this)
  }

  onLogout(){
    alert('user logged out')
    LoggedOut(this)
  }
  
  toggleAdminDisplay(){
    this.adminDisplay=!this.adminDisplay;
  }
}