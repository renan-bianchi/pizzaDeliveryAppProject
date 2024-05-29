import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-resumo-pedido',
  templateUrl: './resumo-pedido.page.html',
  styleUrls: ['./resumo-pedido.page.scss'],
})
export class ResumoPedidoPage implements OnInit {

  public selectedItems: any[] = [];
  public total: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }

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
  }
  

  removeItem(index: number) {
    this.selectedItems.splice(index, 1);
    this.calculateTotal();
  }
  calculateTotal() {
    this.total = this.selectedItems.reduce((acc, item) => acc + (Number(item.valor) * item.quantidade), 0);
    console.log('Total calculado:', this.total);
  }
}