import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { LocalStorageConfig, localStorageSync } from 'ngrx-store-localstorage';

import * as uai from './core/interfaces/auth.interface';
import * as smi from './dashboard/interfaces/state-menu.interface'
import * as uii from './core/interfaces/loading.interface';
import * as cai from './pages/carrito/interfaces/carrito.interface';
import * as sci from './pages/carrito/interfaces/estado-carrito.interface';

import * as ui from './core/store/ui.reducer';
import * as ua from './core/store/usuario.reducer';
import * as sm from './dashboard/store/state-menu.reducer';
import * as ca from './pages/carrito/store/carrito.reducer';
import * as sc from './pages/carrito/store/estado-carrito.reducer';



export interface AppState {
    ui: uii.Loading,
    ua: uai.State,
    sm: smi.StateMenu,
    ca: cai.Carrito[],
    sc: sci.StateCarrito
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    ua: ua.uaReducer,
    sm: sm.amReducer,
    ca: ca.cReducer,
    sc: sc.scReducer    
}

export function persitsData(reducer: ActionReducer<any>): ActionReducer<any> {

    const config: LocalStorageConfig = {
  
      keys: [
  
        {'ua': {  }},
        {'ca': {  }},
        {'sc': {  }}
  
      ],
  
      rehydrate: true,
  
      removeOnUndefined: true,
  
      storage: sessionStorage
  
    };
  
    return localStorageSync(config)(reducer);
  
  }

//   export function clearState(reducer: any) {

//     return function(state: any, action: Action) {
  
//       if (action.type === ) {
  
//         state = undefined;
  
//         sessionStorage.clear();
  
//       }
  
//       return reducer(state, action);
  
//     };
  
//   }

  
  export const metaReducers: MetaReducer<any, Action>[] = [persitsData];
  

