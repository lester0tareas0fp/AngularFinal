import { Routes } from "@angular/router";

import { ActualizarArticulosComponent } from "./actualizar-articulos/actualizar-articulos.component";
import { CrearArticulosComponent } from "./crear-articulos/crear-articulos.component";
import { VerArticulosComponent } from './ver-articulos/ver-articulos.component';

import { ArticuloResolverService } from "./services/articulo-resolver.service";
import { StockResolverService } from './services/stock-resolver.service';
import { ImagenResolverService } from './services/imagen-resolver.service';
import { ArticulosGuard } from "./actualizar-articulos/guards/articulos.guard";


export const articulosRoutes: Routes = [
    { 
        path: '', 
        children: [
            {
                path: '',
                component: VerArticulosComponent
            },
            {
                path: 'ver', 
                component: VerArticulosComponent
            },
            {
                path: 'crear', 
                component: CrearArticulosComponent,
                canActivate: [ArticulosGuard]
            },
            {
                path: 'actualizar', 
                component: ActualizarArticulosComponent,
                resolve: {
                    articulo: ArticuloResolverService,
                    stock: StockResolverService,
                    imagen: ImagenResolverService
                }
            },
            {
                path:'**', redirectTo: 'articulos/ver'
            }
        ]
    }
]