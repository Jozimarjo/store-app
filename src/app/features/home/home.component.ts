import { Component, HostListener, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Item, TypePaidOut } from '../interfaces/item';
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
<<<<<<< HEAD
      this.oldList=[...values];
=======
      console.log(values)
>>>>>>> d144e76c27f9700c275d5f56483b451488be5797
      this.itemList=values.filter(v=>v.sold);

      this.totalPaid = this.itemList
      .filter(v=>v.paidOut === TypePaidOut.PAGO)
      .reduce((acc, cur: Item) => {
        return acc + parseFloat(cur.price);
      }, 0);

      this.unPaid = this.itemList
      .filter(v=>v.paidOut === TypePaidOut.NAO_PAGO)
      .reduce((acc, cur: Item) => {
        return acc + parseFloat(cur.price);
      }, 0);

      this.total = this.itemList
      .filter(v=>v.paidOut === TypePaidOut.NAO_PAGO || v.paidOut === TypePaidOut.PAGO)
      .reduce((acc, cur: Item) => {
        return acc + parseFloat(cur.price);
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
