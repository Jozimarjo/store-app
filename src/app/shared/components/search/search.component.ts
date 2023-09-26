import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input()
  isMob:boolean = false

  serchValue: string=''
  @Output() searchText = new EventEmitter<string>();

  filterText(event: string){
    this.searchText.emit(event);
  }
}
