import { Pipe, PipeTransform } from "@angular/core";



@Pipe({
    name: 'nombre_almacen'
})
export class NombreAlmacenPipe implements PipeTransform{

    constructor( )
    {


    }
    
    
    transform(id: number | string | null) {

        if (id == 1){

            return "Guadalajara"

        }else if (id == 2){

            return "Azuqueca de Henares"

        }else if (id == 3){
            
            return "Mondéjar"

        }else{

            return 'Sin stock'
        }
           
        
           
    } 


}