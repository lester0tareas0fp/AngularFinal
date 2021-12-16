import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'parrafo_mayuscula'
})
export class ParrafoMayusculaPipe implements PipeTransform{


    constructor( )
    {
    }
    
    
    transform(parrafo: string) {

        return parrafo[0].toLocaleUpperCase()+parrafo.substring(1).toLocaleLowerCase();
           
    } 


}