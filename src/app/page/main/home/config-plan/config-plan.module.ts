import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConfigPlanPageRoutingModule } from './config-plan-routing.module';
import { ConfigPlanPage } from './config-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigPlanPageRoutingModule
  ],
  declarations: [ConfigPlanPage]
})
export class ConfigPlanPageModule {}

