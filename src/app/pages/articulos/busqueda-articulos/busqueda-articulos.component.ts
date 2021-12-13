import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-busqueda-articulos',
  templateUrl: './busqueda-articulos.component.html',
  styleUrls: ['./busqueda-articulos.component.css']
})
export class BusquedaArticulosComponent implements OnInit {

  articulos: any[] = [];
  img: string[] = [];
  total_articulos!: number;

  constructor(private service: ArticulosService, private route: ActivatedRoute) 
  { 

    this.route.queryParams.pipe(
      map( params =>{
        this.service.getArticulosBusquedaVista(params.busqueda).subscribe( resp =>
          {
            this.articulos = resp;
            this.total_articulos = this.articulos.length;
            this.inicializar();
          })
      })
    ).subscribe()
    
  }

  ngOnInit(): void {

  }

  inicializar()
  {
    for (let i = 0; i< this.total_articulos; i++ )
    {
      const id_articulo = this.articulos[i].iD_ARTICULO;
      //console.log(id_articulo)
      this.service.getImagen(id_articulo).subscribe( resp =>
        {
          this.img[id_articulo] = resp.imagen;
        },
        error =>
        {
          this.img[id_articulo] = '../assets/pictures/no_image.jpg';
        }
      )
    }
  }

}
