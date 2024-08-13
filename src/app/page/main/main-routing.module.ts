import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'home/config-plan',  // Agregar esta ruta
    loadChildren: () => import('./home/config-plan/config-plan.module').then(m => m.ConfigPlanPageModule)
  },
  {
    path: 'buscar-ejercicio',
    loadChildren: () => import('./buscar-ejercicio/buscar-ejercicio.module').then( m => m.BuscarEjercicioPageModule)
  },
  {
    path: 'ejercicios/:musculo',// revisar
    loadChildren: () => import('./ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
