import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



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

// Método para cargar imagen a Firebase Storage
async uploadProfileImage(file: File, userId: string): Promise<string> {
  const storage = getStorage();
  const storageRef = ref(storage, `profileImages/${userId}`);
  
  const uploadTask = uploadBytesResumable(storageRef, file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Aquí puedes manejar el progreso de la carga si es necesario
      },
      (error) => {
        // Error durante la carga
        reject(error);
      },
      async () => {
        // Carga completada, obtener URL de descarga
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

}
