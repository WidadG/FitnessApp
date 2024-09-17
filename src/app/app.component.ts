import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PushNotificationService } from './services/push-notification.service';  // Servicio de notificaciones push
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { AngularFireMessaging } from '@angular/fire/compat/messaging'; // Importación para Firebase In-App Messaging
import { AlertController } from '@ionic/angular'; // Para mostrar alertas dentro de la aplicación
import { getInstallations, getId } from 'firebase/installations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showFooter = true;

  constructor(
    private router: Router, 
    private pushNotificationService: PushNotificationService,
    private afMessaging: AngularFireMessaging,  // Servicio de In-App Messaging
    private alertController: AlertController // Controlador de alertas para mostrar mensajes
  ) {
    // Controla la visibilidad del footer
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        // Oculta el footer en las rutas que contienen '/auth'
        this.showFooter = !currentUrl.includes('/auth');
      }
    });

    // Inicializa Firebase y solicita permisos de notificación
    this.initializeFirebase();
  }

  initializeFirebase() {
    // Inicializa la aplicación de Firebase
    const app = initializeApp(environment.firebaseConfig);

    // Solicita permiso de notificación y obtiene el token
    this.requestNotificationPermission();

    // Obtener el Firebase Installation ID (FID)
    this.getFirebaseInstallationId();

    // Configura la suscripción a Firebase In-App Messaging
    this.setupInAppMessaging();
  }

  requestNotificationPermission() {
    console.log('Solicitando permiso para notificaciones...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permiso de notificación concedido.');
        this.getFCMToken();
      } else {
        console.log('Permiso de notificación denegado.');
      }
    });
  }

  getFCMToken() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebaseVapidKey }).then((currentToken) => {
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        // Guarda el token en Firestore
        this.pushNotificationService.saveTokenToFirestore(currentToken);
      } else {
        console.log('No hay token disponible. Solicita permiso para generar uno.');
      }
    }).catch((err) => {
      console.log('Ocurrió un error al obtener el token: ', err);
    });

    // Escucha mensajes entrantes cuando la aplicación está en primer plano
    onMessage(messaging, (payload) => {
      console.log('Mensaje recibido en primer plano: ', payload);
      this.showInAppMessage(payload);
    });
  }

  // Configuración de Firebase In-App Messaging
  setupInAppMessaging() {
    this.afMessaging.messages.subscribe((message) => {
      console.log('Mensaje de In-App Messaging recibido: ', message);
      this.showInAppMessage(message);
    });
  }

  // Método para mostrar el mensaje dentro de la app como un modal/alerta
  async showInAppMessage(message: any) {
    const alert = await this.alertController.create({
      header: message.notification?.title || 'Mensaje',
      message: message.notification?.body || 'Has recibido un nuevo mensaje dentro de la aplicación.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Función para obtener el Firebase Installation ID
  getFirebaseInstallationId() {
    const installations = getInstallations();  // Obtén el servicio de Installations
    getId(installations).then((fid) => {
      console.log('Firebase Installation ID:', fid);
    }).catch((err) => {
      console.error('Error al obtener el Firebase Installation ID:', err);
    });
  }
}
