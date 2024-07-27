import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigPlanPage } from './config-plan.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigPlanPageRoutingModule {}

