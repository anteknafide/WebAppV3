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
    this.mojaUsluga.getAllItems().subscribe(
      (dane) => { this.items = dane },
      (error) => { console.error(error) }
    )
  }
}
