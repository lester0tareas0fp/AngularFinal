import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './ver-articulos.component.html',
  styleUrls: ['./ver-articulos.component.css']
})
export class VerArticulosComponent implements OnInit {

  articulos: any[] = [];
  img: string[] = [];
  total_articulos!: number;

  constructor(private service: ArticulosService) 
  { 
    this.service.getArticulos().subscribe( resp =>
      {
        this.articulos = resp;
        this.total_articulos = this.articulos.length;
        this.inicializar();
      })
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
