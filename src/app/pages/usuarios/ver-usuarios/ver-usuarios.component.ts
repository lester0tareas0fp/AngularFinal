import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuariosService } from '../services/usuarios.service';
import { AppState } from '../../../app.reducer';
import { Router } from '@angular/router';
import { setUser } from '../../../core/store/usuario.actions';
import { UsuarioAuth, userInitialState } from '../../../core/interfaces/auth.interface';

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
    this.router.navigate([`/usuarios/actualizar`])
  }

  borrar(id_usuario: number)
  {
    this.service.borrarUsuario({id_usuario: id_usuario}).subscribe( resp =>
      {
        console.log(resp);
      },
      error =>
      {
        console.log(error);
      })

      window.location.reload()
  }

}
