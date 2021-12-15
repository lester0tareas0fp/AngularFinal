import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { UsuarioAuth } from '../../core/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAdministradorGuard implements CanActivate {


  can: boolean = false;
  user?:UsuarioAuth;

  constructor( private store: Store<AppState>, private route: ActivatedRoute)
  {

    this.store.select('ua').subscribe( ua =>
    {
      this.user = ua.user;

      if(this.user && this.user.id_perfil === 1){

        this.can = true;

      } else {

        this.can = false;
        
      }
    })

    
  }

  canActivate(): boolean{
    
   return this.can;
  }

}
