import { createAction, props } from '@ngrx/store';
import { UsuarioAuth } from '../interfaces/auth.interface';

export const setUser = createAction(
    '[UA] Set User',
    props<{user: UsuarioAuth}>()
    );
export const unsetUser = createAction('[UA] Unset User'); 