import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  example(){
    return this.http.get('https://ucyzdq75xj.execute-api.us-east-2.amazonaws.com/scores/data',{
      headers:{
        'Authorization':'teste'
      }
    })
  }
}
