import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InformesRoutingModule } from './informes-routing.module';
import { InformePedidosComponent } from './informe-pedidos/informe-pedidos.component';
import { InformeArticulosComponent } from './informe-articulos/informe-articulos.component';

import { UsuarioPipe } from './pipes/usuario.pipe';
import { ArticuloPipe } from './pipes/articulo.pipe';
import { AlmacenPipe } from './pipes/almacen.pipe';
import { EstadoPipe } from './pipes/estado.pipe';


@NgModule({
  declarations: [
    InformePedidosComponent,
    InformeArticulosComponent,
    UsuarioPipe,
    ArticuloPipe,
    AlmacenPipe,
    EstadoPipe
  ],
  imports: [
    CommonModule,
    InformesRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class InformesModule { }
