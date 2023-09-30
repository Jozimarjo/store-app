import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, TypePaidOut, TypeSold } from 'src/app/features/interfaces/item';
import { ModalService } from '../modal.service';
declare var window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  test=false;
  selected='A_VISTA';
  openModalValue=false;
  form!: FormGroup;
  @Input()
  itens:Item[]=[];
  @ViewChild('dialog') meuModal!: ElementRef;

  select(event:string){
    this.selected=event;
    this.form.controls['type'].setValue(event)
  }
  constructor(private fb: FormBuilder, private modalService: ModalService){

  }
  ngOnInit(): void {
    this.form= this.fb.group({
      name:['',Validators.required],
      price:['',Validators.required],
      sold:[false,Validators. required],
      valuePaid:[''],
      paidOut:[TypePaidOut.NAO_PAGO],
      type:[TypeSold.A_VISTA],
      url:[''],
      date:[''],
      customer:['']
    })

  }
  save(){
    this.fechar()
  }
  fechar(){
    const modalInstance = new window.bootstrap.Modal(
      this.meuModal.nativeElement
    );
    if (modalInstance) {
      modalInstance.show();
      modalInstance.hide();
      setTimeout(()=>{
        modalInstance.hide();

      },3000)
    }

  }

  openModal(){
    this.modalService.next()
  }

}
