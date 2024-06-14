import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-resumo-pedido',
  templateUrl: './resumo-pedido.page.html',
  styleUrls: ['./resumo-pedido.page.scss'],
})
export class ResumoPedidoPage implements OnInit {

  public selectedItems: any[] = [];
  public total: number;
  public metodoPagamento: string = '';
  public pedido: any;

  constructor(private route: ActivatedRoute, private router: Router, private pedidoService: PedidoService) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.selectedItems = nav.extras.state['selectedItems'] || [];
      console.log('Itens recebidos na página de resumo:', this.selectedItems);  // Log para verificar itens recebidos
    }

    // Corrigir a conversão para número
    this.total = this.selectedItems.reduce((acc, item) => acc + Number(item.valor), 0);
    console.log('Total calculado:', this.total);  // Log para verificar total calculado

    this.calculateTotal();

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedItems = this.router.getCurrentNavigation().extras.state['selectedItems'];
        this.calculateTotal();
      }
    });
  }
  

  removeItem(index: number) {
    this.selectedItems.splice(index, 1);
    this.calculateTotal();
  }
  calculateTotal() {
    this.total = this.selectedItems.reduce((acc, item) => acc + (Number(item.valor) * item.quantidade), 0);
    console.log('Total calculado:', this.total);
  }

  confirmarPagamento() {
    const pedidoComTotal = {
      items: this.selectedItems,
      total: this.total,
      formaPagamento: this.metodoPagamento
    };

    this.pedidoService.confirmarPedido(pedidoComTotal).then(() => {
      console.log('Pedido confirmado e enviado para o Firestore');
      // Redirecione para uma página de sucesso ou outra página relevante
      this.router.navigate(['/pedido-confirmado']);
    }).catch(error => {
      console.error('Erro ao confirmar pedido:', error);
    });
  }

  
}

// finalizarCompra() {
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       total: this.total
  //     }
  //   };

  //   this.router.navigate(['pagamento'], navigationExtras);
  // }

  // confirmarPagamento() {
  //   const pedido = {
  //     itens: this.selectedItems,
  //     total: this.total,
  //     metodoPagamento: this.metodoPagamento,
  //     data: new Date()
  //   };

  //   this.pedidoService.addPedido(pedido).then(() => {
  //     console.log('Pedido adicionado com sucesso!');
  //     this.router.navigate(['/pedido-confirmado']); // Redirecionar para a página de confirmação do pedido
  //   }).catch(error => {
  //     console.error('Erro ao adicionar o pedido: ', error);
  //   });
  // }