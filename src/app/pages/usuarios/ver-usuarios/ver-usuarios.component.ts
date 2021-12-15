import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuariosService } from '../services/usuarios.service';
import { AppState } from '../../../app.reducer';
import { Router } from '@angular/router';
import { setUser } from '../../../core/store/usuario.actions';
import { UsuarioAuth, userInitialState } from '../../../core/interfaces/auth.interface';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  public user: UsuarioAuth = userInitialState.user as UsuarioAuth;

  constructor(private service: UsuariosService, private store: Store<AppState>, private router: Router) {
  
     this.store.select('ua').subscribe( usuario =>
      {
        this.user = usuario.user as UsuarioAuth;
      })
  }

  ngOnInit(): void {

    this.service.getUsuarios().subscribe( usuarios =>
      {
        this.usuarios = usuarios;
      })
  }

  actualizarUsuario(id_usuario: number){
    const user = {...this.user};
    user.id_usuario_edicion = id_usuario;
    this.store.dispatch( setUser( { user: user } )  ); 
    this.router.navigate([`/usuarios/actualizar`]);
  }

  borrar(id_usuario: number)
  {
    if(this.user.id_usuario == id_usuario)
    {
      return;
    }

      Swal.fire({
      title: '¿Está seguro que desea borrar al usuario con id '+id_usuario+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.service.borrarUsuario({id_usuario: id_usuario}).subscribe( resp =>
          {
            if(resp.retCode == 10)
            {

              Swal.fire({
                icon: 'success',
                title: resp.mensaje,
                showConfirmButton: false,
                timer: (1000)
              }).then( () => window.location.reload() )
              
            }else{
    
              Swal.fire({
                icon: 'error',
                title: resp.mensaje,
                showConfirmButton: false,
              })
    
            }
    
          },
          httpResponse =>
          {

            if(httpResponse.status==200)
            {
              Swal.fire({
                icon: 'success',
                title: 'Se ha borrado el usuario correctamente',
                showConfirmButton: false,
                timer: (500)
              }).then( () => this.router.navigate(['/usuarios/ver'] ))
              
            }else{
    
              Swal.fire({
                icon: 'error',
                title: httpResponse.error,
                showConfirmButton: false,
              })
    
            }
        
          })
        
      }

    })


  }

}
