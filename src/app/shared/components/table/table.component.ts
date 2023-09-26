import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Item, TypePaidOut, typeValues } from 'src/app/features/interfaces/item';
import { TableConfig } from 'src/app/features/interfaces/models/TableConfig';
type ItemWithStringType = Item & { typeValue?: string };

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableConfig implements OnInit {

  ngOnInit(): void {
    this.tamanhoDaTela()
  }


  // getTypeValue(value: Item, color: string): boolean{
  //   return this.colors[color as keyof typeof this.colors] === value.paidOut;
  // }

  @HostListener('window:resize', ['$event'])
  tamanhoDaTela() {
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    if(largura<769){
      this.isMob=true
    }else{
      this.isMob=false
    }
  }

  // filterTable(value: string){
  //   const normalText = value
  //   value = value.toLocaleLowerCase()

  //   this.itemList = []
  //   this.itemList = this.oldList.filter(v=>{

  //     const result =
  //     v.customer?.toLowerCase().includes(value) ||
  //     v.name.toLowerCase().includes(value) ||
  //     v.price.toLowerCase().includes(value) ||
  //     v.typeValue?.toLowerCase().includes(value) ||
  //     v.date === normalText;
  //     console.log(v.name, " ",result)

  //     return result;
  //   })
  //   console.log(this.itemList)

  // }
}
