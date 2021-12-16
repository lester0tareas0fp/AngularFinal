import { Action, createReducer, on } from "@ngrx/store";
import { carritoInitialState } from '../interfaces/carrito.interface';
import { fillCarrito, emptyCarrito, updateArticulo, eraseArticulo, cambiarCantidad } from './carrito.actions';

const _cReducer = createReducer( carritoInitialState,
    on( fillCarrito, ( state, { carrito } ) =>  (state).concat(carrito) ),

    on( updateArticulo, ( state, { id_articulo, cantidad }) => {

        return state.map( articulos =>
            {
                if(articulos.id_articulo == id_articulo )
                {
                    return { ...articulos, cantidad: (cantidad + articulos.cantidad)};
                }else{
                    return articulos;
                }
            })
    }),

    on( cambiarCantidad, ( state, { id_articulo, cantidad }) => {

        return state.map( articulos =>
            {
                if(articulos.id_articulo == id_articulo )
                {
                    return { ...articulos, cantidad: (cantidad)};
                }else{
                    return articulos;
                }
            })
    }),

    on( eraseArticulo, ( state, { id_articulo }) => {
        return state.filter( articulos => articulos.id_articulo != id_articulo )
    } ),
    
    on( emptyCarrito, state => carritoInitialState )
);

export function cReducer( state: any, action: Action)
{
    return _cReducer(state, action);
}