import { HomeService } from './../home/home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, TypePaidOut, TypeSold } from '../interfaces/item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb:FormBuilder, private service:HomeService){}
  ngOnInit(): void {
    this.form = this.fb.group({
      name:['', Validators.required],
      price:['',Validators.required],
      sold:[false, Validators.required],
      url:['', Validators.required]
    })


}

  initialize(){
    const data:Item[] = [
      {
        name: 'Microondas Penesonic',
        date: '2023-09-25',
        paidOut: TypePaidOut.NAO_PAGO,
        price: 340.00,
        type: TypeSold.A_VISTA,
        sold: true,
        customer:'Ecthon'
      },
      {
        name: 'Fogão Eletrolux',
        date: '2023-09-25',
        paidOut: TypePaidOut.NAO_PAGO,
        price: 1400.00,
        type: TypeSold.A_VISTA,
        sold: true,
        customer: 'Clecia'
      },
      {
        name: 'Air fryer philips',
        date: '2023-09-25',
        paidOut: TypePaidOut.NAO_PAGO,
        price: 250.00,
        type: TypeSold.A_VISTA,
        sold: true,
        customer: 'Deire'
      },
      {
        name: 'Geladeira Samsung',
        price: 2700.00,
        sold: false,
      },
      {
        name: 'Panela de Arroz Mondial',
        price: 2700.00,
        sold: false,
      },
      {
        name: 'Maquina De Lavar Consul 11L',
        price: 1300.00,
        sold: true,
        date: '2023-09-25',
        paidOut: TypePaidOut.NAO_PAGO,
        type: TypeSold.A_VISTA,
        customer: 'Mikaelly'
      },
      {
        name: 'Ferro black decker',
        price: 70.00,
        sold: true,
        date: '2023-09-25',
        paidOut: TypePaidOut.NAO_PAGO,
        type: TypeSold.A_VISTA,
        customer: 'Tia Ruth'
      },

  ]
    data.forEach(v=>{
      this.save(v)

    })
  }
  save(value?: Item){
    // const data:Item= this.form.value;
    if(value  )
    this.service.insert(value).subscribe(v=>console.log(v));
    this.form.reset()
  }
}
