import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenamientoPage } from './entrenamiento.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenamientoPage
  },
  {
    path: 'entrenando',
    loadChildren: () => import('./entrenando/entrenando.module').then( m => m.EntrenandoPageModule)
  },
  {
    path: 'historial-entrenamientos',
    loadChildren: () => import('./historial-entrenamientos/historial-entrenamientos.module').then( m => m.HistorialEntrenamientosPageModule)
  },
  {
    path: 'historial-entrenamientos',
    loadChildren: () => import('./historial-entrenamientos/historial-entrenamientos.module').then(m => m.HistorialEntrenamientosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenamientoPageRoutingModule {}
