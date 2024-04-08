import { Component } from '@angular/core';
import { Item } from '../item/item.model';
import { APIService } from '../api.service';

// import { cartItems } from '../item/item.component';
import { WypelnijKoszyk } from '../item/item.component';
import { WyczyscKoszyk } from '../item/item.component';

//export var adminDisplay = !false;


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  
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
    // debugger
    // console.log(this.singupUsers)
      const userExist = this.singupUsers.find(m=>m.username==this.loginObj.username && m.password==this.loginObj.password)
      if(userExist){
        this.userLoggedIn=true;
        alert('User logged(locked) in')
        this.toggleLoginDisplay()
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
    this.adminDisplay = false;
  }
  
  toggleAdminDisplay(){
    this.adminDisplay=!this.adminDisplay;
  }

  //siNG up jaki noop to pisal??!!??!?!
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