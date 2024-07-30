import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarEjercicioPageRoutingModule } from './buscar-ejercicio-routing.module';

import { BuscarEjercicioPage } from './buscar-ejercicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarEjercicioPageRoutingModule
  ],
  declarations: [BuscarEjercicioPage]
})
export class BuscarEjercicioPageModule {}
