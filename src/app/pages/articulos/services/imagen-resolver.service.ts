import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Imagen } from '../interfaces/imagen.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenResolverService implements Resolve<any> {

  url: string = `https://localhost:7180`;

  constructor(private httpClient: HttpClient) 
  { 

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Imagen>
  {

    const id_articulo = route.queryParams.id_articulo;

    const urlI = `${this.url}/Imagenes?id_articulo=${id_articulo}`;

    const imagen = this.httpClient.get<Imagen>(urlI);

    return imagen;

  }
}
