import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../authentication.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private firestore: AngularFirestore, private authService: AuthenticationService) { }

  async confirmarPedido(pedido: any) {
    try {
      const uid = await this.authService.getCurrentUserUID().toPromise();
      if (uid) {
        const userData = await this.authService.getUserData(uid).pipe(take(1)).toPromise();
        const pedidoComDadosUsuario = {
          ...pedido,
          user: {
            name: userData?.['name'],
            email: userData?.['email']
          }
        };
        await this.firestore.collection('pedidos').add(pedidoComDadosUsuario);
      } else {
        throw new Error('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao confirmar pedido:', error);
    }
  }

  // addPedido(pedido: any) {
  //   return this.firestore.collection('pedidos').add(pedido);
  // }
}