import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InformeArticulo } from '../interfaces/informe-articulo.interface';
import { Pedido } from '../interfaces/pedido.interface';
import { SeccionPedido } from '../interfaces/seccion-pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  url: string = `https://localhost:7180`;

  constructor(private httpClient: HttpClient) 
  { 
  }

  getInformeGeneral(id_articulo: number)
  {
    const url  = `${this.url}/V_Articulos_Stocks/articulo?id_articulo=${id_articulo}`;
    return this.httpClient.get<InformeArticulo[]>(url);
  }

  getPedidos()
  {
    const url  = `${this.url}/Pedidos`;
    return this.httpClient.get<Pedido[]>(url);
  }

  getSeccionesPedidos(id_pedido: number)
  {
    const url  = `${this.url}/Seccion_Pedidos?id_pedido=${id_pedido}`;
    return this.httpClient.get<SeccionPedido[]>(url);
  }


}
