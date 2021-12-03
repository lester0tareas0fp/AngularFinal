import { Action, createReducer, on } from "@ngrx/store";
import { initialState } from "../interfaces/loading.interface";
import { isLoading, stopLoading } from "./ui.actions";

const _uiReducer = createReducer( initialState,
    
    on( isLoading, state => ({ ...state, isLoading: true })),
    on( stopLoading, state => ({ ...state, isLoading: false })) 

);

export function uiReducer(state: any, action: Action ){
    return _uiReducer( state, action);
}


