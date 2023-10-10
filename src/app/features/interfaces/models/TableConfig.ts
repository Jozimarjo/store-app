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
  readonly tags = {
    notSold:{ key: 'notSold', field:'sold' ,value:false},
    sold:{ key: 'sold', field:'sold' ,value:true},
    paidOut:{ key: 'paidOut', field:'paidOut' ,value: TypePaidOut.PAGO},
    notPaidOut:{ key: 'notPaidOut', field:'paidOut' ,value: TypePaidOut.NAO_PAGO},
    parcial: { key: 'parcial', field:'paidOut' ,value: TypePaidOut.PARCIAL},
  }
  count = 0;
  countFilter = 0;
  _itens: Item[]=[];
  itemList: ItemWithStringType[] = []
  oldList: ItemWithStringType[] = []
  selected: string = '';
  selectedCount = 0;
  searchText = '';
  filtersTagValues = {}
  selectedRow: any = {}
  selectedRowCount:{[key:string]:{ value:boolean, price: number}} = {}
  selectResult: number = 0;

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
      this.getCountItens()
      if(this.filterTagActive() || this.searchText){
        this.filterTable(this.searchText)
      }
    }
  }

  getTypeValue(value: Item, color: string): boolean{
    return this.colors[color as keyof typeof this.colors] === value.paidOut;
  }


  filterTable(value: string){
    const normalText = value
    this.searchText=value;
    value = value.toLocaleLowerCase()
    this.itemList =[];
    let iteratorList = [...this.oldList]
    console.log(Object.keys(this.filtersTagValues))

      if(Object.keys(this.filtersTagValues).length>0){
        const keyValue: string =Object.keys(this.filtersTagValues)[0]
        console.log(keyValue,this.tags)

        console.log(this.tags[keyValue as keyof typeof this.tags])
        const field: string =this.tags[keyValue as keyof typeof this.tags].field

        const filterValue =this.tags[keyValue as keyof typeof this.tags].value

        iteratorList = iteratorList.filter(v=>{
          return v[field as keyof ItemWithStringType] === filterValue
        })
        this.itemList = [...iteratorList]
      }else{
        this.itemList = [...this.oldList]
      }

      this.itemList = this.itemList.filter(v=> {
        const result =
          v.customer?.toLowerCase().includes(value) ||
          v.name.toLowerCase().includes(value) ||
          v.price === +value ||
          v.typeValue?.toLowerCase().includes(value) ||
          v.date === normalText;

      return result;
    })
    this.getCountItens()
  }

  filterTag(event:{[key:string]:boolean}){

    if(!Object.values(event)[0]){
      this.filtersTagValues = {};
      this.selected = ''
      this.filterTable(this.searchText)
      return
    }
    this.filtersTagValues = event;
    this.selected = Object.keys(event)[0]
    console.log(this.filtersTagValues);
    this.filterTable(this.searchText)

  }

  editItem(item: Item){
    this.modalService.next(item)
  }

  filterTagActive(){
    return Object.values(this.filtersTagValues).filter(v=>v)[0]
  }

  getCountItens(){
    this.countFilter = this.itemList.length || 0
    this.count= this.oldList.length || 0;
  }

  selectItem(item: Item){
    if(item.key){
      this.selectedRow[item.key]=!this.selectedRow[item.key]
      console.log(this.selectedRowCount[item.key]?.value)
      this.selectedRowCount[item.key] = {
        value: !this.selectedRowCount[item.key]?.value||false,
        price: item.price
      }
      this.selectedCount = Object.values(this.selectedRow).filter(v=>v).length
      this.selectResult = Object.values(this.selectedRowCount)
        .filter((v:any)=>v.value)
        .reduce((acc: any, cur: any)=>{
          return acc + cur.price
        },0)
    }
  }
}
