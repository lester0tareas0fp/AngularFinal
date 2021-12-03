import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class ArticulosGuard implements CanActivate {


  can: boolean = false;

  constructor( private store: Store<AppState>)
  {

  }

  canActivate(): boolean{

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
