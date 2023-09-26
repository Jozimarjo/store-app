import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypePaidOut, TypeSold } from 'src/app/features/interfaces/item';
import { ModalService } from '../modal.service';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/features/home/home.service';
import { AppService } from 'src/app/app.service';
declare var window: any;
declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit,OnDestroy {
  test=false;
  selected='A_VISTA';
  form!: FormGroup;
  modalInstance!: any
  subscriptions = new Subscription()
  @ViewChild('dialog') meuModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private appService: AppService,
    private homeService: HomeService ){ }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
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
    this.subscriptions.add(this.modalService.openModal
      .subscribe(value=>{
        if(value){
          this.open()
        }
      })
    )
  }

  select(event:string){
    this.selected=event;
    this.form.controls['type'].setValue(event)
  }

  save(){
    console.log(this.form.value)
    if(this.form.valid)
    this.homeService.insert(this.form.value).subscribe(v=>{
      this.appService.next(true);
      this.form.reset({
        name:'',
        price:'',
        sold:false
      });
    })
  }
  open(){
    if (!this.modalInstance) {
      this.modalInstance = new bootstrap.Modal(
        this.meuModal?.nativeElement
      );
    }
    this.modalInstance.show()
  }

  close(){
    if (!this.modalInstance) {
      this.modalInstance = new bootstrap.Modal(
        this.meuModal?.nativeElement
      );
    }
    console.log(this.modalInstance)
    this.modalInstance.hide()

  }
}
