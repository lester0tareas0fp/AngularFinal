import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { informesRoutes } from './informes.routes';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(informesRoutes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
