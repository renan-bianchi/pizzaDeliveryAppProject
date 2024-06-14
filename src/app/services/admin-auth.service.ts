import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private ngAdminFireAuth: AngularFireAuth, private firestore: AngularFirestore) { }
  async loginUser(email:string,password:string){
    return await this.ngAdminFireAuth.signInWithEmailAndPassword(email,password);
  }
  login(email: string, password: string): Observable<boolean> {
    return from(this.ngAdminFireAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(userCredential => {
        return this.getAdminUID().pipe(
          switchMap(adminUID => {
            if (userCredential.user?.uid === adminUID) {
              return of(true);
            } else {
              return of(false);
            }
          })
        );
      })
    );
  }

  private getAdminUID(): Observable<string | null> {
    return this.firestore.collection('admins').doc('documentoAdmin').get().pipe(
      map(snapshot => {
        return snapshot.get('uid') || null;
      }),
      catchError(error => {
        console.error('Erro ao recuperar UID do admin:', error);
        return of(null);
      })
    );
  }
}
