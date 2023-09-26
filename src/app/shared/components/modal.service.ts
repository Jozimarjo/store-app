import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openModal$ = new Subject();
  openModal = this.openModal$.asObservable()
  constructor() { }

  next(value: boolean){
    this.openModal$.next(value)
  }
}
