import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import Swal from 'sweetalert2'

import { Usuario, UpdateUsuario } from '../interfaces/usuario.interface';
import { UsuariosService } from '../services/usuarios.service';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-actualizar-usuarios',
  templateUrl: './actualizar-usuarios.component.html',
  styleUrls: ['./actualizar-usuarios.component.css']
})
export class ActualizarUsuariosComponent implements OnInit {

  actualizarUsuariosForm!: FormGroup;

  usuario!: Usuario;

  usuarioUpdate!: UpdateUsuario;

  notSameUser: boolean = true;

  admin!: number | null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: UsuariosService, private store: Store<AppState>) 
  { 
  }

  ngOnInit(): void {

    this.usuario = this.route.snapshot.data['usuario'];

    this.store.select('ua').pipe
    (
      map( usuario =>
        {
          this.admin = usuario.user.id_perfil
          if(this.usuario.id_usuario == usuario.user.id_usuario){

          return false
        }
          else{
            
          return true
        }
        })
    ).subscribe( resp => this.notSameUser = resp)


    this.actualizarUsuariosForm = this.fb.group(
      {
        'usuario':    [this.usuario.usuario, [Validators.required]],
        'email':      [this.usuario.email, [Validators.required]],
        'id_perfil':  [{value: this.usuario.id_perfil, disabled:  (this.admin!=1 || !this.notSameUser)}, [Validators.required]],
        'pass':       [{value:'', disabled: this.notSameUser}, Validators.minLength(4)]
      }
    )
  }

  actualizarUsuario()
  {

    let pass: string;
    if (this.actualizarUsuariosForm.get('pass')?.value)
    {
      pass = this.actualizarUsuariosForm.get('pass')?.value;
    }else{
      pass = '';
    }

    this.usuarioUpdate = {
        'id_usuario':  this.usuario.id_usuario,
        'usuario':    this.actualizarUsuariosForm.get('usuario')?.value,
        'pass':       pass,
        'email':      this.actualizarUsuariosForm.get('email')?.value,
        'id_perfil':  this.actualizarUsuariosForm.get('id_perfil')?.value
    }

    this.service.actualizarUsuario(this.usuarioUpdate).subscribe( resp =>
      {


      },
      httpResponse =>
      {

        if(httpResponse.status==200)
        {
          Swal.fire({
            icon: 'success',
            title: 'Se ha actualizado el usuario correctamente',
            showConfirmButton: false,
            timer: (1000),
            
          }).then( ()=> window.location.reload())
          
        }else{

          Swal.fire({
            icon: 'error',
            title: httpResponse.error,
            showConfirmButton: false,
          })

        }

      });      

  }

}
