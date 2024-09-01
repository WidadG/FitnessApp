import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrenandoPage } from './entrenando.page';

const routes: Routes = [
  {
    path: '',
    component: EntrenandoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntrenandoPageRoutingModule {}
