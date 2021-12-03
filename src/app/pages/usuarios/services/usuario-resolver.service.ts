import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { UsuarioAuth, userInitialState } from '../../../core/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolverService implements Resolve<any> {

  url: string = `https://localhost:7180`;
  public usuario: UsuarioAuth = userInitialState.user as UsuarioAuth;
  

  constructor(private store: Store<AppState>,private httpClient: HttpClient) 
  { 
    this.store.select('ua').subscribe( usuario =>
      {
        this.usuario = usuario.user as UsuarioAuth;
      })
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Usuario> {


    const urlA = `${this.url}/usuarios/usuario?id_usuario=${this.usuario.id_usuario_edicion}`; 

    const usuario = this.httpClient.get<Usuario>(urlA);


    return usuario;
  }
}
