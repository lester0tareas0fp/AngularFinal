import { Routes } from "@angular/router";
import { ArticulosComponent } from "../pages/articulos/articulos.component";
import { CarritoComponent } from "../pages/carrito/carrito.component";
import { CrearPedidoComponent } from "../pages/crear-pedido/crear-pedido.component";
import { InformesComponent } from "../pages/informes/informes.component";
import { UsuariosComponent } from "../pages/usuarios/usuarios.component";
import { InformesGuard } from './guards/informes.guard';
import { UsuariosGuard } from './guards/usuario.guard';

export const dashboardRoutes: Routes = [
    { 
        path: '', 
        children: [
            {
                path: 'usuarios', 
                component: UsuariosComponent,
                loadChildren: () => import('../pages/usuarios/usuarios.module').then( m => m.UsuariosModule )
                
            },
            {
                path: 'articulos', 
                component: ArticulosComponent,
                loadChildren: () => import('../pages/articulos/articulos.module').then( m => m.ArticulosModule )
            },
            {
                path: 'carrito', 
                component: CarritoComponent
            },
            {
                path: 'crear-pedido', 
                component: CrearPedidoComponent
            },
            {
                path: 'informes', component: InformesComponent,
                loadChildren: () => import('../pages/informes/informes.module').then( m => m.InformesModule ),
                canActivate: [InformesGuard]
            },
            {
                path:'**', redirectTo: 'articulos'
            }
        ]
    }
]