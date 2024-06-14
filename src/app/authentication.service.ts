import { ResetPasswordPage } from './paginas/reset-password/reset-password.page';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '@angular/fire/auth';
import { take, map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( public ngFireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  async registerUser(email: string, password: string) {
    try {
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email:string,password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password);
  }

  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async signOut(){
    return await this.ngFireAuth.signOut();
  }

  async getProfile(){
    return new Promise<User | null> ((resolve,reject) =>{
      this.ngFireAuth.onAuthStateChanged(user =>{
        if(user){
          resolve(user)
        }else{
          resolve(null)
        }
      },reject)
    })

    //return await this.ngFireAuth.currentUser;
  }

  async addUserData(uid: string, name: string, address: string, email: string) {
    try {
      await this.firestore.collection('users').doc(uid).set({
        name: name,
        address: address,
        email: email
      });
    } catch (error) {
      throw error;
    }
  }

  getCurrentUserUID() {
    return this.ngFireAuth.authState.pipe(
      take(1),
      map(user => user ? user.uid : null)
    );
  }

  getUserData(uid: string) {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  login(email: string, password: string): Observable<boolean> {
    return from(this.ngFireAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(userCredential => {
        if (userCredential.user) {
          return this.firestore.collection('admins').doc(userCredential.user.uid).get().pipe(
            map(doc => doc.exists)
          );
        } else {
          return [false];
        }
      })
    );
  }

  logout() {
    return this.ngFireAuth.signOut();
  }

}
