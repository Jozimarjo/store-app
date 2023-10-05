import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() totalPaid: number = 0;
  @Input() unPaid: number = 0;
  @Input() total: number = 0 ;
  @Input() totalItens: number = 0;
  @Input() parcialPaidOut: number = 0;

}
