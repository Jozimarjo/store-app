import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, TypePaidOut, TypeSold } from 'src/app/features/interfaces/item';
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
  edit:Item|null= null;
  subscriptions = new Subscription()
  @Input()
  itens: Item[]=[];
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
    this.buildForm()

    this.subscriptions.add(this.modalService.openModal
      .subscribe(value=>{
        if(value){
          this.buildForm(value)
          this.edit=value;
        }else{
          this.buildForm()
          this.edit = null
        }
        this.open()
      })
    )
  }
  buildForm(data?:Item){
    this.form = this.fb.group({
      name:[data?.name || '',Validators.required],
      price:[data?.price|| '',Validators.required],
      sold:[!data?.sold?false:true,Validators. required],
      valuePaid:[data?.valuePaid||''],
      paidOut:[data?.paidOut||TypePaidOut.NAO_PAGO],
      type:[data?.type ||TypeSold.A_VISTA],
      url:[''],
      date:[data?.date||''],
      customer:[data?.customer||'']
    })
  }

  select(event:string){
    this.selected=event;
    this.form.controls['type'].setValue(event)
  }

  changeSelect(event: Item){
    if(!event){
      this.buildForm()
      this.edit=null
      return;
    }
    let item: Item =event;
    this.edit=item
    this.buildForm(item)
  }

  compareItems(item1: Item, item2: Item): boolean {
    return item1 && item2 ? item1.key === item2.key : false;
  }
  save(){
    if(this.form.valid){
      if(!this.form.value.sold){
        this.form.reset({
          name: this.form.controls['name'].value ,
          price: this.form.controls['price'].value,
          sold: this.form.controls['sold'].value,
          valuePaid: '',
          paidOut: '',
          type:'',
          url:'',
          date:'',
          customer: ''
        })
      }
      if (this.edit) {
        this.editProduct()
      } else {
        this.homeService.insert(this.form.value).subscribe(v=>{
          this.appService.next(true);
          this.form.reset({
            name:'',
            price:'',
            sold:false
          });
        })
      }
    }

  }

  editProduct(){
    if(!this.edit?.key)
      return

    this.homeService.updateItem(this.edit?.key,this.form.value).subscribe(()=>{
      this.appService.next(true);
      this.form.reset({
        name:'',
        price:'',
        sold:false
      });
      this.close()
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
    this.modalInstance.hide()
  }
}
