import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { Articulo } from '../interfaces/articulo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from '../interfaces/stock.interface';
import { Imagen } from '../interfaces/imagen.interface';
import { InsertarArticulo } from '../interfaces/insertar-articulo.interface';
import { InsertarStock } from '../interfaces/insertar-stock.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { ArticulosService } from '../services/articulos.service';

import { Carrito } from '../../carrito/interfaces/carrito.interface';

import * as ca from '../../carrito/store/carrito.actions';
import { Subscription } from 'rxjs';
import { setCarrito } from '../../carrito/store/estado-carrito.action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-actualizar-articulos',
  templateUrl: './actualizar-articulos.component.html',
  styleUrls: ['./actualizar-articulos.component.css']
})
export class ActualizarArticulosComponent implements OnInit {

  private obj: any = {};

  actualizarArticuloForm!: FormGroup;

  articulo!: Articulo;

  stock!: Stock[];

  imagen!: Imagen;

  suscripcion!: Subscription;

  cesta: any[] = []

  max: number = 0;

  cantidadArticuloCarrito: number = 0;

  perfil: number | null = 3;

  paramUrl: number = 0;

  constructor(private fb: FormBuilder, private service: ArticulosService, private route: ActivatedRoute, private store: Store<AppState>, private router:Router) 
  { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {

    this.articulo = this.route.snapshot.data['articulo'];
    this.stock = this.route.snapshot.data['stock'];
    this.imagen = this.route.snapshot.data['imagen'];

    this.route.params.pipe(
      map( () =>
        {
          this.route.queryParams.subscribe(param => 
            {
              if(this.articulo.iD_ARTICULO != param.id_articulo)
              {
                window.location.reload();
              }
            });
        })
      
    ).subscribe()

    this.suscripcion = this.store.select('ca').subscribe(carrito =>
      {
        const carro =carrito.find( carro => carro.id_articulo == this.stock[0].iD_ARTICULO )
        if (carro){
          this.cantidadArticuloCarrito = carro.cantidad;
        }
      })

    this.suscripcion.unsubscribe();

    this.suscripcion = this.store.select('ua').subscribe( usuario =>
      {
        this.perfil = usuario.user.id_perfil;
      })

    let maxStock = 0;

    if (this.articulo.iD_ESTADO_ARTICULO != 1)
    {
      
      this.stock.forEach (function(cantidad)
      {
        maxStock += cantidad.cantidad;
      });

      this.max = maxStock;

      maxStock -= this.cantidadArticuloCarrito;

      
    }else{

      maxStock = 1000;

      this.max = maxStock;
    }

    

    const { articulo, descripcion, fabricante, peso, largo, ancho, alto, precio} = this.articulo;

    this.actualizarArticuloForm = this.fb.group(

      {
        'imagen': [],
        'articulo': [{ value: articulo, disabled: (this.perfil! > 1 || this.articulo.iD_ESTADO_ARTICULO! != 1) }, [Validators.required, Validators.minLength(2)]],
        'descripcion': [{ value: descripcion, disabled: (this.perfil! > 1 || this.articulo.iD_ESTADO_ARTICULO!! != 1) }, [Validators.required, Validators.minLength(2)]],
        'fabricante': [{ value: fabricante, disabled: (this.perfil! > 1 || this.articulo.iD_ESTADO_ARTICULO!! != 1) }, [Validators.required, Validators.minLength(2)]],
        'peso': [{ value: peso, disabled: (this.perfil! > 1 || this.articulo.iD_ESTADO_ARTICULO!! != 1) }, [Validators.required, Validators.min(0)]],
        'largo': [{ value: largo, disabled: (this.perfil! > 1 || this.articulo.iD_ESTADO_ARTICULO! != 1) }, [Validators.required, Validators.min(0)] ],
        'ancho': [{ value: ancho, disabled: (this.perfil! > 1 || this.articulo.iD_ESTADO_ARTICULO! != 1) }, [Validators.required, Validators.min(0)]],
        'alto': [{ value: alto, disabled: (this.perfil! > 1 || this.articulo.iD_ESTADO_ARTICULO! != 1) }, [Validators.required, Validators.min(0)]],
        'precio': [{ value: precio, disabled: (this.perfil! > 1 || this.articulo.iD_ESTADO_ARTICULO! != 1) }, [Validators.required, Validators.min(0)]],
        'stock1v': [this.stock[0].cantidad],
        'stock2v': [this.stock[1].cantidad],
        'stock3v': [this.stock[2].cantidad],
        'stock1': [{ value: 0, disabled: (this.perfil! > 2 || this.articulo.iD_ESTADO_ARTICULO! != 1) }, [Validators.min(0), RxwebValidators.numeric({allowDecimal:false})]],
        'stock2': [{ value: 0, disabled: (this.perfil! > 2 || this.articulo.iD_ESTADO_ARTICULO! != 1) }, [Validators.min(0), RxwebValidators.numeric({allowDecimal:false})]],
        'stock3': [{ value: 0, disabled: (this.perfil! > 2 || this.articulo.iD_ESTADO_ARTICULO! != 1) }, [Validators.min(0), RxwebValidators.numeric({allowDecimal:false})]],
        'anadir': [0,[Validators.min(0), Validators.max(maxStock), RxwebValidators.numeric({allowDecimal:false})]],
      }
    )

  }

  establecerImagen( input: any)
  {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {

        this.obj.photoUrl = e.target.result;
        this.imagen.imagen = this.obj.photoUrl;

      }
      
      reader.readAsDataURL(input.files[0]);
    }

    this.imagen.formato = input.files[0].type;
    this.imagen.nombrE_IMAGEN = input.files[0].name;
  }

  actualizar()
  {
    if (this.actualizarArticuloForm.invalid)
    {
      return;
    }

    const articuloActualizado: InsertarArticulo ={

      id_articulo:   this.imagen.iD_ARTICULO,
      articulo:      this.actualizarArticuloForm.get('articulo')?.value,
      descripcion:   this.actualizarArticuloForm.get('descripcion')?.value,
      fabricante:    this.actualizarArticuloForm.get('fabricante')?.value,
      peso:          this.actualizarArticuloForm.get('peso')?.value,
      largo:         this.actualizarArticuloForm.get('largo')?.value,
      ancho:         this.actualizarArticuloForm.get('ancho')?.value,
      alto:          this.actualizarArticuloForm.get('alto')?.value,
      precio:        this.actualizarArticuloForm.get('precio')?.value,
      nombre_imagen: this.imagen.nombrE_IMAGEN,
      imagen:        this.imagen.imagen,
      formato:       this.imagen.formato
    }

    this.service.actualizarArticulo(articuloActualizado).subscribe( resp =>
      {
        //
      },
      error =>
      {
        //
      } 
    );

    for(let i = 1; i <= this.stock.length; i++)
    {

      const cantidad = this.actualizarArticuloForm.get('stock'+i)?.value;

      if(cantidad > 0)
      {
        const agregarStock: InsertarStock = {
          iD_ALMACEN: this.stock[i-1].iD_ALMACEN,
          iD_ARTICULO: this.stock[i-1].iD_ARTICULO,
          cantidad: cantidad,
        }

        this.service.agregarStock(agregarStock).subscribe( resp =>
          {
            // console.log(resp,' resp', this.stock)
          },
          error =>
          {
            // console.log(error,' error')
          } 
        );

      }
      
    }

    Swal.fire({
      icon: 'success',
      title: 'Se ha actualizado el artículo correctamente',
      showConfirmButton: false,
      timer: (1000),
      
    }).then( ()=> window.location.reload())

  }

  agregarArticulo( evento: any )
  {
    evento.preventDefault();
    let carrito: Carrito = {
      id_articulo: this.stock[0].iD_ARTICULO,
      nombre_articulo: this.articulo.articulo,
      cantidad: this.actualizarArticuloForm.get('anadir')?.value,
      imagen: this.imagen.imagen,
      estado: this.articulo.iD_ESTADO_ARTICULO,
      max_stock: this.max
    }

    if( carrito.cantidad == 0)
    {
      return console.log('añade 0 a stock, termina el proceso');
    }

    let indice;

    let cantidadCesta = 0;

    this.suscripcion = this.store.select('ca')
    .subscribe( cesta => 
      {
        indice = cesta.find( articulos => articulos.id_articulo == carrito.id_articulo);

        if(cesta.length == 1)
          this.store.dispatch( setCarrito() )

        if(indice)
        {
          cantidadCesta = indice?.cantidad + carrito.cantidad;
        }

      })

    this.suscripcion.unsubscribe;

    if (cantidadCesta > this.max)
    {
      
      return;
    }


    if( indice )
    {
        this.store.dispatch( ca.updateArticulo({id_articulo: carrito.id_articulo, cantidad: carrito.cantidad}) )

        Swal.fire({
          icon: 'success',
          title: 'Artículo actualizado en el carrito correctamente',
          showConfirmButton: false,
          timer: (1000),
          
        }).then( ()=> window.location.reload())


    }else{


        this.store.dispatch( ca.fillCarrito({carrito}));

        Swal.fire({
          icon: 'success',
          title: 'Artículo agregado al carrito correctamente',
          showConfirmButton: false,
          timer: (1000),
          
        }).then( ()=> window.location.reload())
    }

  }

  borrarArticulo()
  {
    
    Swal.fire({
      title: '¿Está seguro que desea borrar este artículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed)
      {
        this.service.deleteArticulo({id_articulo: this.stock[0].iD_ARTICULO}).subscribe(resp =>
          {

            Swal.fire({
              icon: 'success',
              title: 'Artículo borrado con éxito',
              showConfirmButton: false,
              timer: (1000),
              
            }).then( ()=> window.location.reload())
            
          });
          
      }else{

        return;
      }

    })
    
  }

}
