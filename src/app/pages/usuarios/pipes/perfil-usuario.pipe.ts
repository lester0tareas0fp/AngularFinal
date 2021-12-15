import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'perfil_usuario'
})
export class PerfilUsuarioPipe implements PipeTransform{


    constructor( )
    {


    }
    
    
    transform(id: number | null) {

        if (id == 1){

            return "Administrador";

        }else if (id == 2){

            return 'Gestor'

        }else if (id == 3){

            return 'Operador'

        }{

            return 'Error'
        }  
           
    } 


}