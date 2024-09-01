import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntrenandoPageRoutingModule } from './entrenando-routing.module';

import { EntrenandoPage } from './entrenando.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntrenandoPageRoutingModule
  ],
  declarations: [EntrenandoPage]
})
export class EntrenandoPageModule {}
