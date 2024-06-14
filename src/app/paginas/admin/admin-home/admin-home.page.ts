import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  public pedidos: any[] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection('pedidos').valueChanges().subscribe((data: any) => {
      this.pedidos = data.map((pedido: any) => {
        const items = pedido.items.map((item: any) => ({
          nome: item.nome,
          quantidade: item.quantidade,
        }));

        return {
          ...pedido,
          items,
        };
      });
    });
  }
}