import { createAction } from "@ngrx/store";

export const setCarrito = createAction(
    '[SC] Set Carrito ',
);

export const unsetCarrito = createAction(
    '[SC] Unset Carrito'
);