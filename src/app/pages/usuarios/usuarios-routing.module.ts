import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { usuariosRoutes } from './usuarios.routes';


@NgModule({
  imports: [RouterModule.forChild(usuariosRoutes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
