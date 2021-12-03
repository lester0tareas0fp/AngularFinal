import { Action, createReducer, on } from "@ngrx/store";
import { MenuInitialState } from "../interfaces/state-menu.interface";
import { activateMenu, hideMenu } from "./state-menu.action";


const _amReducer = createReducer( MenuInitialState,

    on( activateMenu, state => ({ ...state, activeMenu: true}) ),
    on( hideMenu, state => ({...state, activeMenu: false}))
)

export function amReducer( state: any, action: Action){
    return ( _amReducer(state, action))
}