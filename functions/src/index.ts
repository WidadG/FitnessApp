import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Inicializar Firebase Admin
admin.initializeApp();

// Función que se ejecuta de forma programada para enviar recordatorios diarios
exports.sendWorkoutReminder = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    const tokensSnapshot = await admin.firestore().collection("users").get();
    const tokens: string[] = [];

    tokensSnapshot.forEach((doc) => {
      const token = doc.data().fcmToken;
      if (token) {
        tokens.push(token);
      }
    });

    const payload = {
      notification: {
        title: "Es hora de entrenar!",
        body: "No olvides completar tu rutina de ejercicios hoy.",
        clickAction: "FLUTTER_NOTIFICATION_CLICK", // Ajusta según tu plataforma
      },
    };

    if (tokens.length > 0) {
      try {
        await admin.messaging().sendToDevice(tokens, payload);
        console.log("Notificaciones enviadas con éxito");
      } catch (error) {
        console.error("Error al enviar notificaciones:", error);
      }
    } else {
      console.log("No hay tokens de FCM disponibles");
    }

    return null;
  });

