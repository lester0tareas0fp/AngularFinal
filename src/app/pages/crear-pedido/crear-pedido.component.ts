import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { Carrito } from '../carrito/interfaces/carrito.interface';
import { CarritoService } from '../articulos/services/carrito.service';
import { Pedido } from './interfaces/pedido.interface';

import { AppState } from 'src/app/app.reducer';
import { emptyCarrito } from '../carrito/store/carrito.actions';
import { unsetCarrito } from '../carrito/store/estado-carrito.action';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent implements OnInit {

  formPedido!: FormGroup;
  subscripcion!: Subscription;

  constructor(private fb: FormBuilder, private servicio: CarritoService, private store: Store<AppState>, private router: Router) 
  { 

  }

  ngOnInit(): void {

    this.formPedido = this.fb.group(
      {
        'calle':     ['', [Validators.required, Validators.minLength(1)]],
        'numero':    [''],
        'provincia': ['',[Validators.required, Validators.minLength(2), Validators.maxLength(42)]],
        'poblacion': ['', [Validators.required, Validators.minLength(1)]],
        'codigo_postal': [,[Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        'telefono': [, [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
        'contacto': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]

      }
    )

  }

  hacerPedido(event: any)
  {
 
    event.preventDefault();


    let carritos!: Carrito[] ;
    let id_usuario: number | null;

    

    this.subscripcion = this.store.select('ca').subscribe(cesta =>
      {
            carritos = cesta
            
      })

      if (carritos.length <= 0){
        console.log('no hay elemnetos en el carrito')
        return;
      }


    this.subscripcion.unsubscribe();

    this.subscripcion = this.store.select('ua').subscribe(usuario =>
      {
        id_usuario = usuario.user.id_usuario
      })

    this.subscripcion.unsubscribe();

    let datosPedido: Pedido = 
    {
        'calle'        :   this.formPedido.get('calle')?.value,
        'numero'       :   this.formPedido.get('numero')?.value,
        'provincia'    :   this.formPedido.get('provincia')?.value, 
        'poblacion'    :   this.formPedido.get('poblacion')?.value, 
        'codigo_postal':   this.formPedido.get('codigo_postal')?.value, 
        'telefono'     :   this.formPedido.get('telefono')?.value, 
        'contacto'     :   this.formPedido.get('contacto')?.value, 
        'id_usuario'   :   id_usuario!
    } 


    let id_pedido: number;

    this.servicio.crearPedido(datosPedido).subscribe(resp => 
      {
        id_pedido = resp.iD_PEDIDO;

        carritos.forEach( carrito => 
          {
              this.servicio.crearSeccionPedido({ id_pedido: id_pedido, id_articulo: carrito.id_articulo, cantidad: carrito.cantidad}).subscribe( resp =>
                {
                  console.log(resp)
                },
                error =>
                {
                  console.log(error)
                })
                
          })
        
      });    

    this.store.dispatch( emptyCarrito() );
    this.store.dispatch( unsetCarrito() );

    this.router.navigate(['/Articulos/verArticulos'])
     
    
  }

}
