import { Item } from './../interfaces/item';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private db : AngularFireDatabase) { }

  getAll(): Observable<Item[]> {
    return this.db.list<Item>('products').valueChanges()
  }
  insert(data: Item):void{
    console.log('DATA',data)
    this.db.list('products').push(data).then(v=>console.log(v))
  }
}
