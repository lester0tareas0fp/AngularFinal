import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { setUser } from 'src/app/core/store/usuario.actions';
import { hideMenu } from 'src/app/dashboard/store/state-menu.action';
import { userInitialState, UsuarioAuth } from '../../core/interfaces/auth.interface';

interface MenuItem {
  nombre: string,
  activo: boolean,
  menuActivo: boolean,
  subMenu: SubMenu[]
}

interface SubMenu {
  nombre: string,
  url: string,
  activo: boolean
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, OnDestroy {

  public usuario: UsuarioAuth = userInitialState.user as UsuarioAuth;
  public suscripcion!: Subscription;
  public activeMenu!: boolean;

  url!: string;

  subMenuArticulos: SubMenu[] =
  [
    {
      nombre: 'Ver-Artículos',
      url: '/articulos/ver',
      activo: true
    },
    {
      nombre: 'Crear-Artículo',
      url: '/articulos/crear',
      activo: true
    }
  ]

  subMenuUsuarios: SubMenu[] =
  [
    {
      nombre: 'Ver-Usuarios',
      url: '/usuarios/ver',
      activo: true
    },
    {
      nombre: 'Crear-Usuario',
      url: '/usuarios/crear',
      activo: true
    }
  ]

  subMenuInformes: SubMenu[] =
  [
    {
      nombre: 'Informe-Pedidos',
      url: '/informes/pedidos',
      activo: true
    },
    {
      nombre: 'Informe-Artículos',
      url: '/informes/articulos',
      activo: true
    }
  ]


  menuItems: MenuItem[] =
  [
    {
      nombre: 'Artículos',
      activo: false,
      menuActivo: false,
      subMenu: this.subMenuArticulos
    },
    {
      nombre: 'Usuarios',
      activo: false,
      menuActivo: false,
      subMenu: this.subMenuUsuarios
    },
    {
      nombre: 'Informes',
      activo: false,
      menuActivo: false,
      subMenu: this.subMenuInformes
    }
  ]

  constructor(private store: Store<AppState>, private router: Router) {

      this.suscripcion = this.store.select('ua').subscribe( usuario =>
        {
          this.usuario = usuario.user as UsuarioAuth;

          this.menuItems.forEach(element => {

            element.activo = false;
              if(this.usuario.id_perfil === 1){

                element.activo = true;
              } else {

                if(element.nombre === 'Artículos'){
                  
                  element.activo = true;
                }
              }
            });

            this.subMenuArticulos.forEach(element => {

              element.activo = false;
                if(this.usuario.id_perfil === 1){
  
                  element.activo = true;
                } else {
  
                  if(element.nombre === 'Ver-Artículos'){
                    
                    element.activo = true;
                  }
                }
              });

        })

   }

  getMenu(){
    return this.menuItems.filter(f => f.activo === true);
  }

  getSubMenu(i: number){
    return this.menuItems[i].subMenu.filter(f => f.activo === true);
  }
  
  ngOnInit(): void {

    

      this.url = `/usuarios/actualizar`
    
  }

  ngOnDestroy(): void{

    this.suscripcion.unsubscribe();
  }

  navegar()
  {
    const user = {...this.usuario};
    user.id_usuario_edicion = this.usuario.id_usuario
    this.store.dispatch( setUser( { user: user } )  ); 
    this.router.navigate([`${this.url}`])
  }

  hideMenu(){
    this.store.dispatch( hideMenu() );
  }

}
