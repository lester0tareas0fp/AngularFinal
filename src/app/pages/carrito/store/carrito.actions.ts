import { createAction, props } from "@ngrx/store";
import { Carrito } from "../interfaces/carrito.interface";

export const fillCarrito = createAction(
    '[CA] Fill Carrito',
    props<{ carrito: Carrito }>()
);

export const updateArticulo = createAction(
    '[CA] Update Artículo',
    props<{ id_articulo: number, cantidad: number }>()
);

export const eraseArticulo = createAction(
    '[CA] Erase Articulo',
    props<{id_articulo: number}>()
)

export const emptyCarrito = createAction(
    '[CA] Unset Carrito'
);