import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypePaidOut, TypeSold } from 'src/app/features/interfaces/item';
// import * as bootstrap from 'bootstrap';
declare var window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  test=false;
  selected='A_VISTA';
  form!: FormGroup;
  @ViewChild('dialog') meuModal!: ElementRef;

  select(event:string){
    console.log(event)
    this.selected=event;
    this.form.controls['type'].setValue(event)
  }
  constructor(private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.form= this.fb.group({
      name:['',Validators.required],
      price:['',Validators.required],
      sold:[false,Validators.required],
      valuePaid:[''],
      paidOut:[TypePaidOut.NAO_PAGO],
      type:[TypeSold.A_VISTA],
      url:[''],
      date:[''],
      customer:['']
    })
  }
  save(){
    console.log(this.form.value)
    this.fechar()
  }
  fechar(){
    console.log(this.meuModal)

    const modalInstance = new window.bootstrap.Modal(
      this.meuModal.nativeElement
    );
    if (modalInstance) {
      console.log('entrou')
      modalInstance.hide();
    }

  }

}
