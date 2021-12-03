import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styles: [
  ]
})
export class ErrorComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  error!: number;

  ngOnInit(): void {

    this.router.queryParams.subscribe( resp => 
      {
        this.error = resp.error;
      })
  }



}
