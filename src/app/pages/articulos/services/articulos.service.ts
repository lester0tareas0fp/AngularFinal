import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Articulo } from '../interfaces/articulo.interface';
import { ArticuloCreado } from '../interfaces/articuloCreado.interface';
import { InsertarArticulo } from '../interfaces/insertar-articulo.interface';
import { InsertarStock } from '../interfaces/insertar-stock.interface';

import { CrearArticulo } from '../interfaces/crearArticulo.interface';
import { Imagen } from '../interfaces/imagen.interface';
import { Stock } from '../interfaces/stock.interface';
import { ArticuloBusqueda } from '../interfaces/articulo-busqueda.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private httpClient: HttpClient) { }

  url: string = `https://localhost:7180`;

  getArticulos()
  {
    const url  = `${this.url}/Articulos`
    return this.httpClient.get<Articulo[]>(url);
  }

  crearArticulo(params: CrearArticulo): Observable<ArticuloCreado>
  {
    const url = `${this.url}/Articulos/crearArticulo`;
    return this.httpClient.post<ArticuloCreado>(url, params);
  }

  
  getImagen(id_articulo: number): Observable<Imagen>
  {
    const url = `${this.url}/Imagenes?id_articulo=${id_articulo}`; 
    return this.httpClient.get<Imagen>(url);
  }
  
  getArticulo(id_articulo: number): Observable<Articulo>
  {
    const url = `${this.url}/articulos/articulo?id_articulo=${id_articulo}`; 
    return this.httpClient.get<Articulo>(url);
  }

  agregarStock(params: InsertarStock)
  {
    const url = `${this.url}/Stock/agregarStock`; 
    return this.httpClient.post<InsertarStock>(url, params);
  }

  actualizarArticulo(params: InsertarArticulo)
  {
    const url = `${this.url}/Articulos/actualizarArticulo`;
    return this.httpClient.post<InsertarArticulo>(url, params);
  }

  getStock(id_articulo: number)
  {
    const url = `${this.url}/Stock?id_articulo=${id_articulo}`;
    return this.httpClient.get<Stock>(url);
  }

  deleteArticulo(id_articulo: any)
  {
    const url = `${this.url}/Articulos/borrarArticulo`;
    return this.httpClient.post<any>(url, id_articulo);
  }

  getArticulosBusqueda(busqueda: string)
  {
    const url = `${this.url}/Articulos/busquedaMax?busqueda=${busqueda}`;
    return this.httpClient.get<ArticuloBusqueda[]>(url);
  }

  getArticulosBusquedaVista(busqueda: string)
  {
    const url = `${this.url}/Articulos/busqueda?busqueda=${busqueda}`;
    return this.httpClient.get<ArticuloBusqueda[]>(url);
  }

}
