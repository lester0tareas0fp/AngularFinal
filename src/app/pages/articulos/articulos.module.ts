import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticulosRoutingModule } from './articulos-routing.module';
import { VerArticulosComponent } from './ver-articulos/ver-articulos.component';
import { CrearArticulosComponent } from './crear-articulos/crear-articulos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActualizarArticulosComponent } from './actualizar-articulos/actualizar-articulos.component';
import { RouterModule } from '@angular/router';
import { CarritoComponent } from '../carrito/carrito.component';
import { CrearPedidoComponent } from '../crear-pedido/crear-pedido.component';
import { BusquedaArticulosComponent } from './busqueda-articulos/busqueda-articulos.component';
import { ParrafoMayusculaPipe } from '../../core/pipes/parrafo-mayuscula.pipe';



@NgModule({
  declarations: [
    VerArticulosComponent,
    CrearArticulosComponent,
    ActualizarArticulosComponent,
    CarritoComponent,
    CrearPedidoComponent,
    BusquedaArticulosComponent,
    ParrafoMayusculaPipe
  ],
  imports: [
    CommonModule,
    ArticulosRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ArticulosModule { }
