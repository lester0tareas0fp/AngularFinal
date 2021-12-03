import { Action, createReducer, on } from "@ngrx/store";
import { initialStateCarrito } from "../interfaces/estado-carrito.interface";
import { setCarrito, unsetCarrito } from './estado-carrito.action';

const _scReducer = createReducer( initialStateCarrito,
    on( setCarrito, state => ({...state, estado: true})),
    on( unsetCarrito, state => ({...state, estado: false}))
);

export function scReducer( state: any, action: Action )
{
    return _scReducer(state, action);
}