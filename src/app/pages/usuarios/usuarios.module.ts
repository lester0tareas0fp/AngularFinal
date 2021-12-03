import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { ActualizarUsuariosComponent } from './actualizar-usuarios/actualizar-usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioComponentComponent } from './components/formulario-component/formulario-component.component';


@NgModule({
  declarations: [
    VerUsuariosComponent,
    CrearUsuariosComponent,
    ActualizarUsuariosComponent,
    FormularioComponentComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
