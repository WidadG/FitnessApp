import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./page/auth/auth.module').then( m => m.AuthPageModule), canActivate:[noAuthGuard]
  },
  

  {
    path: 'main',
    loadChildren: () => import('./page/main/main.module').then( m => m.MainPageModule), canActivate:[AuthGuard]
  },

  {
    path: 'entrenamiento',
    loadChildren: () => import('./page/main/entrenamiento/entrenamiento.module').then(m => m.EntrenamientoPageModule)
  },   {
    path: 'entrenando',
    loadChildren: () => import('./page/main/entrenamiento/entrenando/entrenando.module').then(m => m.EntrenandoPageModule)
  },   {
    path: 'historial-entrenamientos',
    loadChildren: () => import('./page/main/entrenamiento/historial-entrenamientos/historial-entrenamientos-routing.module').then(m => m.HistorialEntrenamientosPageRoutingModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
