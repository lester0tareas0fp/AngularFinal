import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { UsuarioAuth } from '../../core/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosGuard implements CanActivate {


  can: boolean = false;
  user?:UsuarioAuth;

  constructor( private router: Router, private store: Store<AppState>, private route: ActivatedRoute)
  {

    this.store.select('ua').subscribe( ua =>
    {
      this.user = ua.user;
      if(this.esUsuarioAdministrador() || this.esUsuarioValido()){
        this.can = true;
      } else {
        this.can = false;
      }
    })

    
  }

  

  canActivate(): boolean{

    return this.can;
  }

  esUsuarioAdministrador(): boolean{
    return this.user != undefined && this.user.id_perfil === 1;
  }
  esUsuarioValido(): boolean{
    return this.user != undefined && this.user.id_usuario === this.user.id_usuario_edicion;
  }

}
