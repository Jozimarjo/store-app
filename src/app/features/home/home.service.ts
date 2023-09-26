import { Item } from './../interfaces/item';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private db : AngularFireDatabase) { }

  getAll(): Observable<Item[]> {
    return this.db.list<Item>('products').valueChanges()
  }

  insert(data: Item): Observable<any> {
    return new Observable(observer => {
    this.db.list('products').push(data)
    .then(v=>{
      console.log('User insert ',data)
      observer.next();
      observer.complete();
    })

    })
  }
}
