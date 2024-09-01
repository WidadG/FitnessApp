import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);

  // importacion firestore
  firestore = inject(AngularFirestore)
  utilsSvc = inject(UtilsService)
  // autenticacion 

  getAuth(){
    return getAuth();
  }

  // acceder
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

// CREAR USUARIO REGISTRO
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  
// ACTUALIZAR USUARIO
updateUser(displayName: string){
  return updateProfile(getAuth().currentUser, {displayName})
}

// Enviar mail para restablecer contraseña 
sendRecoveryEmail(email: string){
  return sendPasswordResetEmail(getAuth(), email )

}
// cerrar sesion 
signOut() {
  getAuth().signOut();
  localStorage.removeItem('user');
  this.utilsSvc.routerLink('/auth')
}

// ruta para ingreso de home 
// base de datos 
// setear documento 

setDocument(path: string, data: any){
  return setDoc(doc(getFirestore(), path),data);
}
// obtener informacion del usuario
async getDocument(path: string){
  return (await getDoc(doc(getFirestore(), path))).data();

}

async getConsejoByFase(fase: string) {
  const querySnapshot = await this.firestore.collection('consejos', ref => ref.where('etapaCiclo', '==', fase)).get().toPromise();
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  } else {
    return null;
  }
}

}
