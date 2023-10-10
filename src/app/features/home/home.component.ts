import { Component, HostListener, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Item, TypePaidOut, TypeSold } from '../interfaces/item';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemList:Item[] =[]
  oldList:Item[] =[]
  isMob=false
  totalPaid!: number;
  unPaid!: number;
  total!: number;
  totalItens:number = 0;
  parcialPaidOut: number = 0;
  totalCreditPaid: number = 0;
constructor(private homeService: HomeService, private app: AppService){}
  ngOnInit(): void {
    this.tamanhoDaTela()
    this.getAll()
  }
  sendMsg(item: Item){
    const numeroWhatsApp = '92984319670'; // Insira o número de telefone do WhatsApp com o código do país
    const mensagem = `Olá,gostaria de comprar o produto ${item.name}`; // Insira a mensagem padrão
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank'); // Abre a URL do WhatsApp em uma nova janela/aba
  }


  getAll(){

    this.homeService.getAll().subscribe(values=>{
      // values = values.sort((a, b)=>{
      //  return +(a.name > b.name) || +(a.name === b.name) - 1;
      // })
      // console.log(values)
      this.oldList=[...values];
      this.itemList=[...values];

      this.totalPaid = this.itemList
      .filter(v=>v.sold && v.type === TypeSold.A_VISTA)
      .filter(v=>v.paidOut === TypePaidOut.PAGO)
      .reduce((acc, cur: Item) => {
        return acc + cur.price;
      }, 0);

      this.totalCreditPaid = this.itemList
      .filter(v=>v.sold && v.type === TypeSold.PARCELADO)
      .filter(v=>v.paidOut === TypePaidOut.PAGO)
      .reduce((acc, cur: Item) => {
        return acc + cur.price;
      }, 0);

      this.unPaid = this.itemList
      .filter(v=>v.sold)
      .filter(v=>v.paidOut === TypePaidOut.NAO_PAGO)
      .reduce((acc, cur: Item) => {
        return acc + cur.price;
      }, 0);

      let parcialPaidOut: number = this.itemList
      .filter(v=>v.sold)
      .filter(v=>v.paidOut === TypePaidOut.PARCIAL)
      .reduce((acc, cur: Item) => {
        return acc + (cur.valuePaid || 0);
      }, 0);
      this.totalPaid = this.totalPaid+parcialPaidOut;

      this.total = this.itemList
      .filter(v=>v.sold)
      .filter(v=>v.paidOut === TypePaidOut.NAO_PAGO || v.paidOut === TypePaidOut.PAGO)
      .reduce((acc, cur: Item) => {
        return acc + cur.price;
      }, 0);


      this.totalItens = this.oldList
      .reduce((acc, cur: Item) => {
        return acc + cur.price;
      }, 0);
      this.total = this.total + parcialPaidOut;

      this.parcialPaidOut = this.itemList
        .filter( v => v.valuePaid && v.valuePaid >0 )
        .reduce((acc, cur: Item) => {
          return acc +(cur?.valuePaid ?? 0)
        }, 0);
    })

  }

  @HostListener('window:resize', ['$event'])
  tamanhoDaTela() {
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    if(largura<615){
      this.isMob=true
    }else{
      this.isMob=false

    }
  }

}
