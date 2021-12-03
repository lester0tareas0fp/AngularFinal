import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app.reducer';
import { unsetUser } from 'src/app/core/store/usuario.actions';
import { activateMenu, hideMenu } from 'src/app/dashboard/store/state-menu.action';
import { emptyCarrito } from 'src/app/pages/carrito/store/carrito.actions';
import { setCarrito } from 'src/app/pages/carrito/store/estado-carrito.action';
import { unsetCarrito } from '../../pages/carrito/store/estado-carrito.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  activeMenu: boolean = true;

  setCarrito!: boolean;

  subscription!: Subscription;

  constructor(private store: Store<AppState>, private route: Router) 
  { 

  }

  ngOnInit(): void {

    this.subscription = this.store.select('ca').subscribe( ca =>
      {
        if (ca.length > 0)
        {
          this.store.dispatch( setCarrito() )
        }
      })

      this.subscription.unsubscribe;

      this.store.select('sc')
      .subscribe( sc => 
        {
          this.setCarrito = sc.estado;
        })

  }

  logout()
  {
    this.store.dispatch( unsetUser() );
    this.store.dispatch( activateMenu() );
    this.store.dispatch( emptyCarrito() );
    this.store.dispatch( unsetCarrito() );
    this.route.navigate(['/login']);

  }

  stateMenu()
  {
    if ( this.activeMenu == true )
    {

      this.store.dispatch( hideMenu() );
      this.activeMenu = false;
    }else{

      this.store.dispatch( activateMenu() );
      this.activeMenu = true
    }
  }

}
