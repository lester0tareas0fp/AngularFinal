import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Carrito } from './interfaces/carrito.interface';
import { emptyCarrito, eraseArticulo, cambiarCantidad } from './store/carrito.actions';
import { unsetCarrito } from './store/estado-carrito.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  carritos: Carrito[] = [];

  cantidad: number[] = [];

  subscription!: Subscription;

  constructor( private store: Store<AppState>, private router: Router ) 
  { 
    this.subscription = this.store.select('ca').subscribe( ca =>
      {
        this.carritos = ca;
      } 
    )

    this.carritos.forEach( carrito => 
      {
        this.cantidad[carrito.id_articulo] = carrito.cantidad;
      })

    

  }

  ngOnInit(): void {

  }

  sumar(id_articulo: number)
  {

    let cantidad = this.cantidad[id_articulo] + 1;
    let articuloCesta: Carrito[];

    this.subscription = this.store.select('ca').subscribe( ca =>
      {
        this.carritos = ca;
      } 
    )

    this.subscription.unsubscribe();

    articuloCesta = this.carritos.filter( carrito => carrito.id_articulo == id_articulo);

    if (cantidad >= articuloCesta[0].max_stock)
    {
      cantidad = articuloCesta[0].max_stock;
    }

    this.store.dispatch( cambiarCantidad({id_articulo, cantidad }));

    this.cantidad[id_articulo] = cantidad;

  }

  restar(id_articulo: number)
  {

    if(this.cantidad[id_articulo] <= 1){
      this.cantidad[id_articulo] = 1;
      return;
    }

    let cantidad = this.cantidad[id_articulo] - 1;

    this.subscription = this.store.select('ca').subscribe( ca =>
      {
        this.carritos = ca;
      } 
    )

    this.subscription.unsubscribe();

    this.store.dispatch( cambiarCantidad({id_articulo, cantidad }));

    this.cantidad[id_articulo] = cantidad;

  }

  vaciarCarrito()
  {
    this.store.dispatch( emptyCarrito() );
    this.store.dispatch( unsetCarrito() );

    this.router.navigate(['/articulos']);
  }

  eliminarArticulo(id_articulo: number)
  {
    this.store.dispatch( eraseArticulo( { id_articulo } ) );
  }
  
}
