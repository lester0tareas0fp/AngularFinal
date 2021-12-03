import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../app.reducer';
import { LoginService } from './login.service';
import * as ui from '../core/store/ui.actions';
import { setUser, unsetUser } from '../core/store/usuario.actions';
import { UsuarioAuth } from '../core/interfaces/auth.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  uiSubscription!: Subscription;
  cargando: boolean = false;
  usuario!: UsuarioAuth;

  nombre: boolean = true;
  pass: boolean = true;

  error: number = -1;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private store: Store<AppState>) 
  {
    this.store.select('ua').subscribe( resp => 
      {
        if ( resp.user.usuario != null )
        {
          this.router.navigate(['/']);
        }
      })
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        pass: ['', Validators.required]
      }
    );

    this.uiSubscription = this.store.select('ui')
      .subscribe( ui => 
        {
          this.cargando = ui.isLoading;
        })

  }

  ngOnDestroy(){

    this.uiSubscription.unsubscribe();
  }


  login()
  {
    if (this.loginForm.invalid)
    {
      return;
    }

    this.store.dispatch( ui.isLoading() );
    this.loginService.verificarAuth(this.loginForm)
      .subscribe( resp => 
      {
        this.store.dispatch( setUser( { user: resp } )  ); 
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/']);
      },
      error =>
      {
        this.store.dispatch( ui.stopLoading() );
        this.store.dispatch( unsetUser() );
        if (error.status != 400)
        {
          this.router.navigate(['/err'],{ queryParams: {'error': error.status}} );
        }

        this.error = error.status;
      })
  }

  valido(tipo: string)
  {
    if( this.error == 400 )
    {
      this.error = -1;
    }
    if ( tipo == 'nombre' )
    {
      this.nombre = this.loginForm.get(tipo)?.valid!;
    }

    if ( tipo == 'pass' )
    {
      this.pass = this.loginForm.get(tipo)?.valid!;
    }
  }

}