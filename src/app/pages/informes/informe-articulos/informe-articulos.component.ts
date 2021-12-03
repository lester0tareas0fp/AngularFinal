import { Component, OnInit } from '@angular/core';
import { InformeArticulo } from '../interfaces/informe-articulo.interface';
import { InformesService } from '../services/informes.service';
import { ArticulosService } from '../../articulos/services/articulos.service';
import { Articulo } from '../../articulos/interfaces/articulo.interface';

@Component({
  selector: 'app-informe-articulos',
  templateUrl: './informe-articulos.component.html',
  styleUrls: ['./informe-articulos.component.css']
})
export class InformeArticulosComponent implements OnInit {

  informeArticulo: InformeArticulo[][] = [];

  articulos: Articulo[] = [];

  mostrar: boolean[] = [];

  cantidadStock: number[] = [];

  constructor(private service: InformesService, private articuloService: ArticulosService) 
  { 

  }

  ngOnInit(): void {

    this.articuloService.getArticulos().subscribe( articulos =>
      {
        this.articulos = articulos;

        this.articulos.forEach( articulo => 
          {
            this.service.getInformeGeneral(articulo.iD_ARTICULO).subscribe( stocks =>
              {
  
                this.informeArticulo[articulo.iD_ARTICULO] = stocks;

                this.cantidadStock[articulo.iD_ARTICULO] = 0;

                stocks.forEach( stock => {
                  this.cantidadStock[articulo.iD_ARTICULO] += stock.cantidad;
                })
  
              }
            )
          } 
        )

      })      

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
