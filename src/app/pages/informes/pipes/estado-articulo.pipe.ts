import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'estado_articulo'
})
export class EstadoArticuloPipe implements PipeTransform{


    constructor( )
    {


    }
    
    
    transform(id: number | null) {

        if (id == 1){

            return "Activo";

        }else if (id == 2){

            return 'Eliminado'

        }else{

            return 'Error'
        }  
           
    } 


}