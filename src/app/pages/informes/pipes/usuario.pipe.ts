import { Pipe, PipeTransform } from "@angular/core";
import { PipeService } from "../services/pipe.service";
import { Usuario } from '../../usuarios/interfaces/usuario.interface';



@Pipe({
    name: 'usuario'
})
export class UsuarioPipe implements PipeTransform{

    usuario!: Usuario;

    constructor( private service: PipeService  )
    {


    }
    
    
    async transform(id: number | null) {

        if (id){

            this.usuario = await this.service.getUsuario(id).toPromise().finally();

            return this.usuario.usuario;

        }else{

            return 'Sin usuario'
        }
           
        
           
    } 


}