import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tags-filter',
  templateUrl: './tags-filter.component.html',
  styleUrls: ['./tags-filter.component.scss']
})
export class TagsFilterComponent {
  state=false

  @Input() name: string = ''
  @Input() color: string = ''
  @Input() key: string = ''
  @Output() filterTag = new EventEmitter<{[key:string]:boolean}>();
  @Input()
  set active(value: boolean) {
    this.state= value
  }

  selectFilter(){
    this.state= !this.state
    const result = {
      [`${this.key}`]:this.state
    }
    console.log(result)
    return this.filterTag.emit(result)
  }
}
