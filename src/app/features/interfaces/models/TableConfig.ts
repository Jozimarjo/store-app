import { ModalService } from './../../../shared/components/modal.service';
import { Component, HostListener, Input } from "@angular/core";
import { Item, TypePaidOut, typeValues } from "../item";
type ItemWithStringType = Item & { typeValue?: string };

@Component({
  template: '',
})
export class TableConfig {
  isMob =false;
  readonly colors= {
    GREEN: TypePaidOut.PAGO,
    YELLOW: TypePaidOut.PARCIAL,
    RED: TypePaidOut.NAO_PAGO
  }

  _itens: Item[]=[];
  itemList: ItemWithStringType[] = []
  oldList: ItemWithStringType[] = []
  constructor(private modalService: ModalService){}
  @Input()
  set itens(value: Item[]){
    if(value){
      this.itemList = value.map(v=>{
        const value:ItemWithStringType = {...v}

        if(v.type){
          value.typeValue = typeValues[v.type]
        }
        return value;
      })
      this.oldList = [...this.itemList]
    }
  }

  getTypeValue(value: Item, color: string): boolean{
    return this.colors[color as keyof typeof this.colors] === value.paidOut;
  }


  filterTable(value: string){
    const normalText = value
    value = value.toLocaleLowerCase()

    this.itemList = []
    this.itemList = this.oldList.filter(v=>{

      const result =
      v.customer?.toLowerCase().includes(value) ||
      v.name.toLowerCase().includes(value) ||
      v.price.toLowerCase().includes(value) ||
      v.typeValue?.toLowerCase().includes(value) ||
      v.date === normalText;

      return result;
    })

  }
  editItem(item: Item){
    this.modalService.next(item)
  }
}
