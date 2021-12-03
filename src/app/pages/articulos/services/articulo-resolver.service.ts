import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../interfaces/articulo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloResolverService implements Resolve<any> {

  url: string = `https://localhost:7180`;

  constructor(private httpClient: HttpClient) 
  { 

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Articulo> {

    const id_articulo = route.queryParams.id_articulo;

    const urlA = `${this.url}/articulos/articulo?id_articulo=${id_articulo}`; 

    const articulo = this.httpClient.get<Articulo>(urlA);


    return articulo;
  }
}
