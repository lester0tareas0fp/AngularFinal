import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class PedidoGuard implements CanActivate {

  can: boolean = false;

  constructor( private store: Store<AppState>, private router: Router)
  {

  }

  canActivate(): boolean {

    this.store.select('ca')
    .subscribe( carrito =>
      {
        if ( carrito.length < 1 )
        {
          
         this.can = false;
         this.router.navigate(['/ver-articulos']);
        }else{
          this.can = true;
        }
        
      })


    return this.can;
  }

}
