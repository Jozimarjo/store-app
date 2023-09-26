import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';


const components = [
  NavbarComponent
]
@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule
  ],
  exports:[
    components
  ]
})
export class CoreModule { }
