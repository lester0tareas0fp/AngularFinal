import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Carrito } from './interfaces/carrito.interface';
import { emptyCarrito } from './store/carrito.actions';
import { unsetCarrito } from './store/estado-carrito.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  carritos: Carrito[] = [];

  subscription!: Subscription;

  constructor( private store: Store<AppState>, private router: Router ) 
  { 

  }

  ngOnInit(): void {

    this.subscription = this.store.select('ca').subscribe( ca =>
      {
        this.carritos = ca;
      } 
    )

    this.subscription.unsubscribe();

  }

  vaciarCarrito()
  {
    this.store.dispatch( emptyCarrito() );
    this.store.dispatch( unsetCarrito() );

    this.router.navigate(['/articulos']);
  }
  
}
