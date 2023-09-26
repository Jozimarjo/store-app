import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Item } from 'src/app/features/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openModal$ = new Subject<Item|undefined>();
  openModal = this.openModal$.asObservable()
  constructor() { }

  next(value?: Item){
    this.openModal$.next(value)
  }
}
