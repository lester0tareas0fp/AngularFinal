import { Pipe, PipeTransform } from "@angular/core";
import { Articulo } from '../../articulos/interfaces/articulo.interface';
import { ArticulosService } from "../../articulos/services/articulos.service";



@Pipe({
    name: 'estado'
})
export class EstadoPipe implements PipeTransform{


    constructor( )
    {


    }
    
    
    transform(id: number | null) {

        if (id == 1){

            return "Completado";

        }else if (id == 2){

            return 'Pendiente'
        }else if (id == 3){

            return 'enviado'
        }else if (id == 4){

            return 'Finalizado'
        }else{

            return 'Error'
        }  
           
    } 


}