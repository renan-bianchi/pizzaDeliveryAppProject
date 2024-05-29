import { Component, OnInit } from '@angular/core';
import { GetMenuService } from 'src/app/services/get-menu.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router'; // Adicione Router aqui

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.scss'],
})
export class CardapioPage implements OnInit {
  
  public menuSalgadas: any;
  public menuDoces: any;
  public menuBebidas: any;
  public itemSoma: number = 1;
  public selectedItems: any[] = [];

  constructor(private getMenu: GetMenuService, private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    this.getMenu.getPizzasSalgadas().subscribe((menuSalgadas:any) => {
      this.menuSalgadas = menuSalgadas.map((item: any) => ({ ...item, quantidade: 1 }));
    });
    this.getMenu.getPizzasDoces().subscribe((menuDoces:any) => {
      this.menuDoces = menuDoces.map((item: any) => ({ ...item, quantidade: 1 }));
    });
    this.getMenu.getBebidas().subscribe((menuBebidas:any) => {
      this.menuBebidas = menuBebidas.map((item: any) => ({ ...item, quantidade: 1 }));
    })
  }
  addToCart(item: any) {
    this.selectedItems.push(item);
    console.log('Item adicionado ao carrinho:', item);  // Log para verificar adição ao carrinho
    console.log('Itens selecionados:', this.selectedItems);  // Log para verificar todos os itens selecionados
  }

  finalizeOrder() {
    console.log('Finalizando pedido com itens:', this.selectedItems);  // Log para verificar itens antes de finalizar
    const navigationExtras: NavigationExtras = {
      state: {
        selectedItems: this.selectedItems
      }
    };
    this.navCtrl.navigateForward('/resumo-pedido', navigationExtras);
  }

  increaseQuantity(type: string, index: number) {
    if (type === 'salgadas') {
      this.menuSalgadas[index].quantidade += 1;
    } else if (type === 'doces') {
      this.menuDoces[index].quantidade += 1;
    } else if (type === 'bebidas') {
      this.menuBebidas[index].quantidade += 1;
    }
  }

  decreaseQuantity(type: string, index: number) {
    if (type === 'salgadas' && this.menuSalgadas[index].quantidade > 1) {
      this.menuSalgadas[index].quantidade -= 1;
    } else if (type === 'doces' && this.menuDoces[index].quantidade > 1) {
      this.menuDoces[index].quantidade -= 1;
    } else if (type === 'bebidas' && this.menuBebidas[index].quantidade > 1) {
      this.menuBebidas[index].quantidade -= 1;
    }
  }

  finalizarPedido() {
    const selectedItems = [
      ...this.menuSalgadas.filter((item: any) => item.selected),
      ...this.menuDoces.filter((item: any) => item.selected),
      ...this.menuBebidas.filter((item: any) => item.selected)
    ];

    const navigationExtras: NavigationExtras = {
      state: {
        selectedItems: selectedItems
      }
    };

    this.router.navigate(['resumo-pedido'], navigationExtras);
  }

  // AcrescentarItem() {
  //   this.itemSoma = this.itemSoma + 1;
  // }
  toggleSelection(item: any) {
    item.selected = !item.selected;
  }
}