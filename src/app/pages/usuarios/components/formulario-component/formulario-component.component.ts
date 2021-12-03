import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-formulario-component',
  templateUrl: './formulario-component.component.html',
  styleUrls: ['./formulario-component.component.css']
})
export class FormularioComponentComponent implements OnInit {

  childForm!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) 
  { 

  }

  ngOnInit(): void {

    this.childForm = this.rootFormGroup.control;
  }

}
