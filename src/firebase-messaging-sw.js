// Importa los scripts necesarios de Firebase para que pueda trabajar con el Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js');

// Configura Firebase utilizando las credenciales de tu proyecto
firebase.initializeApp({
  apiKey: "AIzaSyC-GKXnp9V8aEtG0RzX-uhanrgCbD89yUs",
  authDomain: "womanfit-47f7e.firebaseapp.com",
  projectId: "womanfit-47f7e",
  storageBucket: "womanfit-47f7e.appspot.com",
  messagingSenderId: "482549925527",
  appId: "1:482549925527:web:705b98bfe30e3b228f0bd2",
  firebaseVapidKey: "BNq03gG88w78YAnnG4vA4bxRl66SKDzxdqq4b9XL_WztmE7jdGCi1sj9-ToZkda-aSWHM8tbHovShL4rtZc2vkg"
});

// Obtiene una instancia del servicio de mensajería de Firebase para trabajar con notificaciones en segundo plano
const messaging = firebase.messaging();

// Este bloque de código maneja los mensajes que se reciben cuando la aplicación está en segundo plano
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Recibido mensaje en segundo plano ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/imagenes/push.png' // Icono de notificacion
  };

  // Muestra la notificación utilizando el API de notificaciones del navegador
  self.registration.showNotification(notificationTitle, notificationOptions);
});
