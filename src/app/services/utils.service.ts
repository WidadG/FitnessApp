import { inject, Injectable } from '@angular/core';
import {
  IonSpinner,
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  // loading ( cargando en el login)
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  //Toast arroja el error de credenciales
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
  // enruta a culaquier pagina disponible
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }
  // guarda un elemento en localstorage
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  // Obtener un elemento desde localstore
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

  constructor() { }
}
