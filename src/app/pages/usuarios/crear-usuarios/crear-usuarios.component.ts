import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUsuario } from '../interfaces/usuario.interface';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  usuarioForm!: FormGroup;

  nuevoUsuario!: CreateUsuario;

  constructor(private fb: FormBuilder, private service: UsuariosService, private router: Router) 
  { 
  }

  ngOnInit(): void {

    this.usuarioForm = this.fb.group(
      {
        'usuario':  ['', [Validators.required, Validators.minLength(2)]],
        'pass':     [{value: '', disabled: true}, [Validators.required, Validators.minLength(2)]],
        'email':    ['', [Validators.required, Validators.minLength(6), Validators.email]],
        'id_perfil':[3, [Validators.required]]
      }
    )

  }

  crearUsuario()
  {

    this.nuevoUsuario = 
    {

        'usuario':    this.usuarioForm.get('usuario')?.value,
        'pass':       'hola',
        'email':      this.usuarioForm.get('email')?.value,
        'id_perfil':  this.usuarioForm.get('id_perfil')?.value,
    }

    this.service.createUsuario(this.nuevoUsuario).subscribe( resp =>
      {
        console.log(resp)
      },
      error =>
      {
        console.log(error)
      })

      this.router.navigate(['/usuarios/ver'])

  }

}
