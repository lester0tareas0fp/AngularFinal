import { Routes } from "@angular/router";

import { InformePedidosComponent } from './informe-pedidos/informe-pedidos.component';
import { InformeArticulosComponent } from './informe-articulos/informe-articulos.component';



export const informesRoutes: Routes = [
    { 
        path: '', 
        children: [
            {
                path: '',
                component: InformeArticulosComponent
            },
            {
                path: 'pedidos', 
                component: InformePedidosComponent            
            },
            {
                path: 'articulos', 
                component: InformeArticulosComponent                
            },
            {
                path:'**', redirectTo: '/informes/informes-articulos'
            }
        ]
    }
]