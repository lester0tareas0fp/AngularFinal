export interface Usuario {
    usuario:    string;
    id_usuario: number;
    email:      string;
    id_perfil:  number;
}

export interface CreateUsuario {
    usuario:    string;
    pass:       string;
    email:      string;
    id_perfil:  number;
}

export interface UpdateUsuario {
    id_usuario: number;
    usuario:    string;
    pass:       string;
    email:      string;
    id_perfil:  number;
}

