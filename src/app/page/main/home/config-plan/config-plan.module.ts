import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConfigPlanPageRoutingModule } from './config-plan-routing.module';
import { ConfigPlanPage } from './config-plan.page';

import { EntrenamientoPageModule } from '../../entrenamiento/entrenamiento.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigPlanPageRoutingModule,
    EntrenamientoPageModule
  ],
  declarations: [ConfigPlanPage]
})
export class ConfigPlanPageModule {}

