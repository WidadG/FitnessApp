import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialEntrenamientosPage } from './historial-entrenamientos.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialEntrenamientosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialEntrenamientosPageRoutingModule {}
