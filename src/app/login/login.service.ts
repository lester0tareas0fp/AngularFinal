import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { sha256 } from 'js-sha256';
import { Observable } from 'rxjs/internal/Observable';

import { UsuarioAuth } from '../core/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _usuario!: UsuarioAuth;

  get usuario()
  {
    return {...this._usuario};
  }

  constructor(private httpClient: HttpClient) 
  { 
  }

  verificarAuth(loginForm: FormGroup): Observable<UsuarioAuth>
  {

    const nombre: string = loginForm.get('nombre')?.value;
    const pass: string = sha256((loginForm.get('pass')?.value));

    const url = `https://localhost:7180/Usuarios/auth/`;

    const params = { 'usuario': nombre, 'pass': pass};

    return this.httpClient.post<UsuarioAuth>( url, params );

  }

}
