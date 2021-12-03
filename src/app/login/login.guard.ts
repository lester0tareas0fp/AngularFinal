import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( private router: Router, private store: Store<AppState>)
  {

  }

  canActivate(): boolean {

    this.store.select('ua')
    .subscribe( resp =>
      {
        if ( resp.user.usuario == null )
        {
          this.router.navigate(['/login']);
        }
      })


    return true;
  }

}
