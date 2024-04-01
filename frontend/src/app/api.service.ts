import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from './item/item.model';

const API_URL = "http://localhost:5555/api/v1"

const mojeNaglowkiHTTP = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
})


@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http :HttpClient) { }

  getAllItems() :Observable<Item[]> {
    return this.http.get<Item[]>(`${API_URL}/clothingshop`, {headers: mojeNaglowkiHTTP})
  } 

  addNewItem(item :Item) :Observable<Object> {
    return this.http.post<Item>(`${API_URL}/clothingshop`, item, {headers: mojeNaglowkiHTTP})
  }

  deleteItem(id :string, rev :string) :Observable<Object> {
    return this.http.delete(`${API_URL}/clothingshop/${id}/${rev}`, {headers: mojeNaglowkiHTTP})
  }

  updateItem(item :Item) :Observable<Object> {
    return this.http.patch(`${API_URL}/clothingshop`, item, {headers: mojeNaglowkiHTTP})
  }
}


