import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class InformesGuard implements CanActivate {

  can: boolean = false;

  constructor( private store: Store<AppState>)
  {

  }

  canActivate(): boolean {

    this.store.select('ua')
    .subscribe( resp =>
      {
        if ( resp.user.id_perfil != 1 )
        {
          
         this.can = false;
        }else{
          this.can = true;
        }
        
      })


    return this.can;
  }

}
