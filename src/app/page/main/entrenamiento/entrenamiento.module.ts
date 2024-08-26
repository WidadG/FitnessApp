import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EntrenamientoPageRoutingModule } from './entrenamiento-routing.module';
import { EntrenamientoPage } from './entrenamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrenamientoPageRoutingModule
  ],
  declarations: [EntrenamientoPage]
})
export class EntrenamientoPageModule {}
