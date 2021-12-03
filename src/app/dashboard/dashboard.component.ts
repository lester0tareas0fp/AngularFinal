import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  activeMenu!: boolean;
  smSubcription!: Subscription;

  constructor(private store: Store<AppState>) { 

  }

  ngOnInit(): void {

    this.smSubcription = this.store.select('sm').subscribe( resp =>
      {
        this.activeMenu = resp.activeMenu;
      }
    )
    
  }

  ngOnDestroy(): void {

    this.smSubcription.unsubscribe;
  }

}
