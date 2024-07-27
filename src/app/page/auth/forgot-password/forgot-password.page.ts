/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, inject, OnInit,NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]),
  })
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }
// validacion mail con base de datos
  async submit(){
    
    if (this.form.valid){
      const loading = await this.utilsSvc.loading();
      await loading.present();


      this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res =>{

        this.utilsSvc.presentToast({
          message: 'correo enviado con exito ',
          duration: 1500,
          color: 'tertiary',
          position: 'middle',
          icon: 'mail-outline'
        });
        this.utilsSvc.routerLink('/auth');
        this.form.reset();
        
        

        
        // errores del login 
        
      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'tertiary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
        
      }).finally(() =>{
        loading.dismiss();
      })
      
        
        
      }
    }
  
}