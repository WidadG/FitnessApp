import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenamientoPage } from './entrenamiento.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenamientoPageRoutingModule {}
