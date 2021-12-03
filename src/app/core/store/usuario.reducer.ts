import { Action, createReducer, on } from "@ngrx/store";
import { userInitialState } from '../interfaces/auth.interface';
import { setUser, unsetUser } from "./usuario.actions";

const _uaReducer = createReducer( userInitialState,

    on( setUser, ( state, { user } ) => ({ ...state, user: { ...user  } }) ),
    on ( unsetUser, state => ({ ...state, user: { usuario: null, id_perfil: null, id_usuario: null, id_usuario_edicion: null }  }))

)
    
 export function uaReducer( state: any, action: Action )
{
    return _uaReducer(state, action);
}