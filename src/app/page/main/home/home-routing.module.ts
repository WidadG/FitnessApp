import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'config-plan',
    loadChildren: () => import('./config-plan/config-plan.module').then( m => m.ConfigPlanPageModule)
  },
  {
    path: 'entrenamiento',
    loadChildren: () => import('src/app/page/main/entrenamiento/entrenamiento.module').then(m => m.EntrenamientoPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
