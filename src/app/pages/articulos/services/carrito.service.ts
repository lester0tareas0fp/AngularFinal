import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pedido } from '../../crear-pedido/interfaces/pedido.interface';
import { SeccionPedido } from '../../crear-pedido/interfaces/seccion-pedido.interface';
import { PedidoRespuesta } from '../../crear-pedido/interfaces/pedido-respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  url: string = `https://localhost:7180`;

  constructor(private httpClient: HttpClient) 
  { 

  }

  crearPedido(params: Pedido)
  {
    const url = `${this.url}/Pedidos/crearPedido`;
    return this.httpClient.post<PedidoRespuesta>(url, params);
  }

  crearSeccionPedido(params: SeccionPedido)
  {
    const url = `${this.url}/Pedidos/crearSeccionPedido`;
    return this.httpClient.post<any>(url, params);
  }



}
