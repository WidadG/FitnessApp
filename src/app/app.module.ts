import { EnvironmentInjector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { YoutubeEmbedUrlPipe } from './youtube-embed-url.pipe'; // Ajusta la ruta si es necesario



// firebase
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { VideoService } from './services/video.servise';@NgModule({
  declarations: [
    AppComponent,
    YoutubeEmbedUrlPipe
  ],

  imports: [
    BrowserModule, 
    IonicModule.forRoot({mode: "md"}), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule],
    

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    VideoService
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}


