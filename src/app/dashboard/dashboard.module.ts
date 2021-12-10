import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ArticulosComponent } from '../pages/articulos/articulos.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { InformesComponent } from '../pages/informes/informes.component';
import { ClickStopPropagation } from '../core/directives/click-stop-propagation.directive';

@NgModule({
  declarations: [
    ArticulosComponent,
    UsuariosComponent,
    InformesComponent,
    ClickStopPropagation
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
