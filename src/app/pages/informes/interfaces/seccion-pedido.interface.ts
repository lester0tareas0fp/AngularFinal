export interface SeccionPedido {
    iD_SECCION_PEDIDO: number;
    iD_PEDIDO:         number;
    iD_ARTICULO:       number;
    iD_STOCK:          number | null;
    cantidad:          number;
    iD_ESTADO_PEDIDO:  number;
}