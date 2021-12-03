import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario, CreateUsuario, UpdateUsuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = `https://localhost:7180`;

  constructor(private httpClient:HttpClient) 
  { 

  }

  getUsuarios()
  {
    const url = `${this.url}/Usuarios`;
    return this.httpClient.get<Usuario[]>(url);
  }

  borrarUsuario(params: any)
  {
    const url = `${this.url}/Usuarios/borrarUsuario`;
    return this.httpClient.post<any>(url, params)
  }

  createUsuario(params: CreateUsuario)
  {
    const url = `${this.url}/Usuarios/crearUsuario`;
    return this.httpClient.post<any>(url, params);
  }

  actualizarUsuario(params: UpdateUsuario)
  {
    const url = `${this.url}/Usuarios/actualizarUsuario`;
    return this.httpClient.post<any>(url, params)
  }


}
