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


  @HostListener('window:resize', ['$event'])
  tamanhoDaTela() {
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    if(largura<769){
      this.isMob = true
    }else{
      this.isMob = false
    }
  }

  getSelect(item: ItemWithStringType){
    if(item.key)
      return this.selectedRow[item.key]

    return false
  }
}
