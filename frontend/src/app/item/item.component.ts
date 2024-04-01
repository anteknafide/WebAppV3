import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from './item.model';
import { APIService } from '../api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() przedmiot :Item
  @Output() itemUsuniety = new EventEmitter<Item>()
  @Output() itemZaktualizowany = new EventEmitter()

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
}
