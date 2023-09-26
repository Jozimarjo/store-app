import { Item } from './../interfaces/item';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppService } from 'src/app/app.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private db : AngularFireDatabase) { }

  // getAll(): Observable<Item[]> {
  //   return this.db.list<Item>('products').valueChanges()
  // }

  getAll(): Observable<Item[]> {
    return this.db.list<Item>('products')
    .snapshotChanges()
    .pipe(
      map((changes:any)=>{
        return changes.map((v:any)=>({key:v.payload.key , ...v.payload.val()}))
      })
    )
  }

  insert(data: Item): Observable<void> {
    return new Observable(observer => {
      this.db.list('products').push(data)
      .then(v=>{
        observer.next();
        observer.complete();
      })
    })
  }

  updateItem(key: string, newData: Partial<Item>): Observable<void> {
    return new Observable(observer => {
      this.db.list('products')
      .update(key, newData)
      .then(v=>{
        observer.next();
        observer.complete();
      });
    })
  }
}
