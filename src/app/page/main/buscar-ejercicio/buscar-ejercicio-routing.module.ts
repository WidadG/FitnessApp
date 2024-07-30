import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarEjercicioPage } from './buscar-ejercicio.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarEjercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarEjercicioPageRoutingModule {}
