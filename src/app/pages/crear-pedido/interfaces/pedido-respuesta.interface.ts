export interface PedidoRespuesta {
    iD_PEDIDO:    number;
    iD_DIRECCION: number;
    iD_USUARIO:   number;
    fecha:        Date;
    contacto:     string | null;
}