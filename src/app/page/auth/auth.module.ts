import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { SharedModule } from 'src/app/shared/shared.module';

import { FirebaseService } from 'src/app/services/firebase.service'; // Importa el servicio
import { UtilsService } from 'src/app/services/utils.service'; // Importa el servicio



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [AuthPage],
  providers: [FirebaseService,UtilsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthPageModule {}
