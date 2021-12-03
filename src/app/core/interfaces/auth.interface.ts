export interface UsuarioLogin{
    nombre: string,
    pass: string
}

export interface UsuarioAuth{
    usuario: string | null,
    id_perfil: number | null,
    id_usuario: number | null,
    id_usuario_edicion: number | null
}

export interface State{
    user: UsuarioAuth
}

export const userInitialState: State = {
    user: {
        usuario: null,
        id_perfil: null,
        id_usuario: null,
        id_usuario_edicion: null
    }
} 
