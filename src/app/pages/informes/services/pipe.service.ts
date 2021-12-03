import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../usuarios/interfaces/usuario.interface';
import { Almacen } from '../interfaces/almacen.interface';

@Injectable({
  providedIn: 'root'
})
export class PipeService {


  url: string = `https://localhost:7180`;

  constructor(private httpClient: HttpClient) 
  { 
  }

  getUsuario(id_usuario: number)
  {
    const url  = `${this.url}/Usuarios/usuario?id_usuario=${id_usuario}`;
    return this.httpClient.get<Usuario>(url);
  }

  getAlmacen(id_stock: number | null)
  {
    if (!id_stock){
      id_stock = 0;
    }
    const url  = `${this.url}/Stock/almacen?id_stock=${id_stock}`;
    return this.httpClient.get<Almacen>(url);
  }

}
