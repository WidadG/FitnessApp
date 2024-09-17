import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from 'src/environments/environment'; // Asegúrate de que apunte a la configuración correcta
import { initializeApp } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Para obtener el usuario autenticado

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  // Solicitar permisos para mostrar notificaciones
  requestPermission() {
    const app = initializeApp(environment.firebaseConfig);
    const messaging = getMessaging(app);

    getToken(messaging, { vapidKey: environment.firebaseVapidKey }).then((currentToken) => {
      if (currentToken) {
        console.log('Token de notificación recibido:', currentToken);
        // Guardar el token en Firestore
        this.saveTokenToFirestore(currentToken);
      } else {
        console.log('No se pudo obtener el token.');
      }
    }).catch((err) => {
      console.error('Error al obtener el token de notificación:', err);
    });
  }

  // Guardar el token en Firestore
  public saveTokenToFirestore(token: string) {
    // Obtener el usuario autenticado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
        this.firestore.collection('users').doc(userId).update({
          fcmToken: token
        }).then(() => {
          console.log('FCM Token guardado en Firestore');
        }).catch((error) => {
          console.log('Error al guardar FCM Token en Firestore:', error);
        });
      } else {
        console.log('El usuario no está autenticado.');
      }
    });
  }

  // Escuchar mensajes entrantes
  listenForMessages() {
    const app = initializeApp(environment.firebaseConfig);
    const messaging = getMessaging(app);

    onMessage(messaging, (payload) => {
      console.log('Mensaje recibido:', payload);
      // Puedes mostrar una notificación aquí o realizar alguna acción
    });
  }
}


