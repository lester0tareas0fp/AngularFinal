import { Routes } from "@angular/router";
import { ActualizarUsuariosComponent } from "./actualizar-usuarios/actualizar-usuarios.component";
import { CrearUsuariosComponent } from "./crear-usuarios/crear-usuarios.component";
import { UsuarioResolverService } from "./services/usuario-resolver.service";
import { VerUsuariosComponent } from "./ver-usuarios/ver-usuarios.component";
import { UsuarioAdministradorGuard } from '../../dashboard/guards/usuario-administrador.guard';
import { UsuariosGuard } from '../../dashboard/guards/usuario.guard';





export const usuariosRoutes: Routes = [
    { 
        path: '', 
        children: [
            {
                path: '',
                component: VerUsuariosComponent
            },
            {
                path: 'ver', 
                component: VerUsuariosComponent,
                canActivate: [UsuarioAdministradorGuard],
            },
            {
                path: 'crear', 
                component: CrearUsuariosComponent,
                canActivate: [UsuarioAdministradorGuard],
            },
            {
                path: 'actualizar', 
                component: ActualizarUsuariosComponent,
                canActivate: [UsuariosGuard],
                resolve: {
                    usuario: UsuarioResolverService,
                }
            },
            {
                path:'**', redirectTo: 'usuarios/ver'
            }
        ]
    }
]