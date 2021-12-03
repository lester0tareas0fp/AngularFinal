import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { articulosRoutes } from './articulos.routes';

@NgModule({
  imports: [RouterModule.forChild(articulosRoutes)]
})
export class ArticulosRoutingModule { }
