import { EnvironmentInjector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { YoutubeEmbedUrlPipe } from './youtube-embed-url.pipe'; // Ajusta la ruta si es necesario

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { environment } from 'src/environments/environment'; // Asegúrate de que apunte al archivo correcto
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Servicios
import { VideoService } from './services/video.servise';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeEmbedUrlPipe
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({ mode: "md" }), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase
    AngularFireAuthModule, // Módulo de autenticación
    AngularFireMessagingModule // Módulo de notificaciones push
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    VideoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
