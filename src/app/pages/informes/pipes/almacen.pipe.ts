import { Pipe, PipeTransform } from "@angular/core";
import { PipeService } from "../services/pipe.service";
import { Almacen } from '../interfaces/almacen.interface';



@Pipe({
    name: 'almacen'
})
export class AlmacenPipe implements PipeTransform{

    almacen!: Almacen;

    constructor( private service: PipeService  )
    {


    }
    
    
    async transform(id: number | null) {

        if (id){

            this.almacen = await this.service.getAlmacen(id).toPromise().finally();

            return this.almacen.id_almacen;

        }else{

            return 'Sin almacén'
        }
           
        
           
    } 


}