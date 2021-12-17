export interface Carrito {
    
    id_articulo: number ,
    nombre_articulo: string ,
    cantidad: number,
    imagen: string,
    estado: number,
    max_stock: number
}

export interface CarritoState{
    carrito: Carrito
}

export const carritoInitialState: Carrito[] = []


