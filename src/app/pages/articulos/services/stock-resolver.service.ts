import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Stock } from '../interfaces/stock.interface';

@Injectable({
  providedIn: 'root'
})
export class StockResolverService implements Resolve<any> {

  url: string = `https://localhost:7180`;

  constructor(private httpClient: HttpClient) 
  { 

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Stock> {

    const id_articulo = route.queryParams.id_articulo;

    const urlS = `${this.url}/Stock?id_articulo=${id_articulo}`;

    const stock = this.httpClient.get<Stock>(urlS);


    return stock;
  }
}
