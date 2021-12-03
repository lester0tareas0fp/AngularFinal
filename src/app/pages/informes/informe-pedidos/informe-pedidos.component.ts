import { Component, OnInit } from '@angular/core';
import { Pedido } from '../interfaces/pedido.interface';
import { SeccionPedido } from '../interfaces/seccion-pedido.interface';
import { InformesService } from '../services/informes.service';

@Component({
  selector: 'app-informe-pedidos',
  templateUrl: './informe-pedidos.component.html',
  styleUrls: ['./informe-pedidos.component.css']
})
export class InformePedidosComponent implements OnInit {

  pedidos: Pedido[] = [];

  seccionesPedido: SeccionPedido[][] = [];

  mostrar: boolean[] = [];

  estadoPedido: number[] = [];

  constructor(private service: InformesService) 
  { 

  }

  ngOnInit(): void {

    this.service.getPedidos().subscribe( pedidos =>
      {
        this.pedidos = pedidos;

        this.pedidos.forEach( pedido =>
          {
            this.service.getSeccionesPedidos(pedido.iD_PEDIDO).subscribe( seccionesPedido =>
              {
                this.seccionesPedido[pedido.iD_PEDIDO] = seccionesPedido;

                if (seccionesPedido.find( element => element.iD_ESTADO_PEDIDO == 2))
                {
                  this.estadoPedido[pedido.iD_PEDIDO] = 2;

                }else if (seccionesPedido.find( element => element.iD_ESTADO_PEDIDO == 3)){

                  this.estadoPedido[pedido.iD_PEDIDO] = 3;

                }else if (seccionesPedido.find( element => element.iD_ESTADO_PEDIDO == 4)){

                  this.estadoPedido[pedido.iD_PEDIDO] = 4;

                }else{

                  this.estadoPedido[pedido.iD_PEDIDO] = 1;
                  
                }
              })
          } )
      }
    )
  }

  mostrarDetalle(id_articulo: number)
  {
    this.mostrar[id_articulo] = true;
  }

  ocultarDetalle(id_articulo: number)
  {
    this.mostrar[id_articulo] = false;
  }

  

}
