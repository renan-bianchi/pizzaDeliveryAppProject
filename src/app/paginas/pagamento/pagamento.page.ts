import { PedidoService } from './../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  public total: number = 0;
  public formaPagamento: string;

  constructor(private route: ActivatedRoute, private router: Router, private pedidoService: PedidoService) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.total = nav.extras.state['total'] || 0;
    }
  }

  confirmarPagamento() {
    const pedido = {
      total: this.total,
      formaPagamento: this.formaPagamento,
      timestamp: new Date(),
      status: 'pendente'
    };

    this.pedidoService.confirmarPedido(pedido).then(() => {
      console.log('Pedido salvo com sucesso');
      // Aqui você pode redirecionar para uma página de confirmação ou resetar o estado
    }).catch(error => {
      console.error('Erro ao salvar o pedido: ', error);
    });

    console.log('Forma de pagamento selecionada:', this.formaPagamento);
    console.log('Total a pagar:', this.total);
  }
}