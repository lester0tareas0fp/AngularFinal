import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app.reducer';
import { unsetUser } from 'src/app/core/store/usuario.actions';
import { activateMenu, hideMenu } from 'src/app/dashboard/store/state-menu.action';
import { emptyCarrito } from 'src/app/pages/carrito/store/carrito.actions';
import { setCarrito } from 'src/app/pages/carrito/store/estado-carrito.action';
import { unsetCarrito } from '../../pages/carrito/store/estado-carrito.action';
import { Router } from '@angular/router';
import { ArticulosService } from '../../pages/articulos/services/articulos.service';
import { ArticuloBusqueda } from '../../pages/articulos/interfaces/articulo-busqueda.interface';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  activeMenu!: boolean;

  setCarrito!: boolean;

  subscription!: Subscription;

  listadoBusqueda: ArticuloBusqueda[] = [];

  busquedaArt!: string;

  mostrar: boolean = false;

  @Output()
  public  hide = new EventEmitter<boolean>()

  @ViewChild('buscador') buscador!: ElementRef;

  constructor(private store: Store<AppState>, private route: Router, private servicio: ArticulosService) 
  { 
    this.store.select('ca').subscribe( ca =>
      {
        if (ca.length > 0)
        {
          this.store.dispatch( setCarrito() )
        }else{

          this.store.dispatch( unsetCarrito() );
        }
      })

      this.store.select('sm').subscribe( sm =>
        {
          this.activeMenu = sm.activeMenu;
        })
  


      this.store.select('sc').subscribe( sc => 
        {
          this.setCarrito = sc.estado;
        })

  }

  ngOnInit(): void {

  }

  logout()
  {
    this.store.dispatch( unsetUser() );
    this.store.dispatch( hideMenu() );
    this.store.dispatch( emptyCarrito() );
    this.store.dispatch( unsetCarrito() );
    this.route.navigate(['/login']);

  }

  stateMenu(e:Event)
  {
    e.stopPropagation()   

    if ( this.activeMenu == true )
    {

      this.store.dispatch( hideMenu() );
      this.activeMenu = false;
    }else{

      this.store.dispatch( activateMenu() );
      this.activeMenu = true
    }
  }

  busqueda()
  {

    this.subscription = this.servicio.getArticulosBusqueda(this.buscador.nativeElement.value).subscribe(articulos => 
      {
        this.listadoBusqueda = articulos;
      })

      this.mostrar = true;

  }

  mostrarBusqueda(mostrar: boolean)
  {
    this.mostrar = mostrar;
  }

  irArticulosBusqueda( evento: any){

    if( this.buscador.nativeElement.value != "" && (evento.key == "Enter" || evento.pointerId == 1 ) )
    {
      this.route.navigate(['/articulos/busqueda'], { queryParams: { busqueda: this.buscador.nativeElement.value } })
    }else{

      return
    }

    this.limpiarBuscador();
  }

  limpiarBuscador()
  {
    this.buscador.nativeElement.value = "";
    this.listadoBusqueda = [];
  }

}
