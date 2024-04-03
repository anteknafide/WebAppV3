import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from './item.model';
import { APIService } from '../api.service';

//import { adminDisplay } from '../categories/categories.component';

// export const cartItems: Item[] = [];
var cartItems: Item[] = [];

//dodaje tylko przy otwartym koszyku, i nadpisuje
export function wypelnijKoszyk(){
  const container = document.getElementById("cartContent");
  while (container?.firstChild) {
    container?.removeChild(container?.firstChild);
  }
  console.log(`wypelniam koszyk ${cartItems.length} itemami`)
  let suma = 0

  cartItems.forEach(przedmiot => {
    //tworzenie cartItemu
    const cartItem = document.createElement('div')
    
    //cartItemContent
    const cartItemInfo = document.createElement('p')
    cartItemInfo.textContent = `${przedmiot.name} | ${przedmiot.price} zł`
    cartItem.appendChild(cartItemInfo);

    //przycisk usuwania - nie ma funkcjonalnosci
    const cartItemDeleteButton = document.createElement('button')
    cartItemDeleteButton.textContent = `usun`
    cartItem.appendChild(cartItemDeleteButton);
    
    //wypelnianie koszyka cartItemem
    container?.appendChild(cartItem)

    //updateowanie ceny
    suma =+ przedmiot.price
  });
  //document.getElementById('cartPrice')!.textContent = `Price: ${suma} zł`
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})

export class ItemComponent {
  @Input() przedmiot :Item
  @Output() itemUsuniety = new EventEmitter<Item>()
  @Output() itemZaktualizowany = new EventEmitter()

  innerAdminDisplay = true
  itemPierwotny :Item

  trybEdycji = false

  constructor(private mojaUsluga :APIService) {}

  usunItem() {
    if(this.przedmiot._id && this.przedmiot._rev) {
      this.mojaUsluga.deleteItem(this.przedmiot._id, this.przedmiot._rev).subscribe(
        (res) => {
          this.itemUsuniety.emit(this.przedmiot)
        },
        (err) => {
          console.error(err)
        }
      )
    }
  }
  edytujItem() {
    this.itemPierwotny = structuredClone(this.przedmiot)
    this.trybEdycji = true
  }

  anulujEdycje() {
    this.przedmiot = this.itemPierwotny
    this.trybEdycji = false
  }

  zapiszEdycje() {
    this.mojaUsluga.updateItem(this.przedmiot).subscribe(
      (res) => {
        this.itemZaktualizowany.emit(this.przedmiot)
        this.trybEdycji = false
      },
      (err) => {
        console.error(err)
      }
    )

  }

  dodajDoKoszyka(){
    cartItems.push(this.przedmiot)
    console.log(`dodaje do koszyka item, teraz jest ${cartItems.length} itemow`)

    wypelnijKoszyk()
  }



}