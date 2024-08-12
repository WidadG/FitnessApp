import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EjerciciosPageRoutingModule } from './ejercicios-routing.module';

import { EjerciciosPage } from './ejercicios.page';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EjerciciosPageRoutingModule
  ],
  declarations: [EjerciciosPage, SafePipe]
})
export class EjerciciosPageModule {}
