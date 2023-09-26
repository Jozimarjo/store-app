import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  alert$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  alert = this.alert$.asObservable();
  constructor() { }


  next(value: boolean ){
    this.alert$.next(value);
    if(value){
      setTimeout(()=>{
        this.alert$.next(false)
      },3000)
    }
  }
}
