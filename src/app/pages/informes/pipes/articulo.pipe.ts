import { Pipe, PipeTransform } from "@angular/core";
import { Articulo } from '../../articulos/interfaces/articulo.interface';
import { ArticulosService } from "../../articulos/services/articulos.service";



@Pipe({
    name: 'articulo'
})
export class ArticuloPipe implements PipeTransform{

    articulo!: Articulo;

    id!: number;

    constructor( private service: ArticulosService  )
    {


    }
    
    
    async transform(id: number | null) {

        if (id){

            this.articulo = await this.service.getArticulo(id).toPromise().finally();

            return this.articulo.articulo;

        }else{

            return 'Sin artículo'
        }
           
        
           
    } 


}