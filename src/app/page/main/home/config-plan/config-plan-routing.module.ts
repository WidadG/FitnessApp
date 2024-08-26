import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigPlanPage } from './config-plan.page';


const routes: Routes = [
  {
    path: '',
    component: ConfigPlanPage
  },
  {
    path: 'entrenamiento',
    
    loadChildren: () => import('../../entrenamiento/entrenamiento.module').then( m => m.EntrenamientoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigPlanPageRoutingModule {}

