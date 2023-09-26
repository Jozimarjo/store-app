import { Component,  OnInit } from '@angular/core';
import { TestService } from './test.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'test';
  constructor(private service: TestService){}
  ngOnInit(): void {
    console.log(environment)
  }

}
