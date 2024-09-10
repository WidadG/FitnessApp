import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialEntrenamientosPageRoutingModule } from './historial-entrenamientos-routing.module';

import { HistorialEntrenamientosPage } from './historial-entrenamientos.page';
import { Router, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HistorialEntrenamientosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HistorialEntrenamientosPageRoutingModule
  ],
  declarations: [HistorialEntrenamientosPage]
})
export class HistorialEntrenamientosPageModule {}
