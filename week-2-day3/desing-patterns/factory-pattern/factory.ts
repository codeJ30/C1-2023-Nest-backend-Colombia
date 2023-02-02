import { Cubo } from './Cubo';
import { Rombo } from './Rombo';
import { Triangulo } from './Triangulo';

export class Factory {

    // atributos para garantizar que la data llegue igual a la entidad que se estan manejando
    static readonly ROMBO: string = "ROMBO";
    static readonly CUBO: string = "CUBO";
    static readonly TRIANGULO: string = "TRIANGULO";

    static crearForma (entity:string){
        if(entity === Factory.ROMBO){
            return new Rombo();
          }else if(entity === Factory.CUBO){
           return new Cubo();
          }else if(entity === Factory.TRIANGULO){
           return new Triangulo();
    }
       }   
    


    // metodo estatico que recibe una entidad de tipo string y 
    //valida que esta entidad existe o esta creada por medio de sus atributos y retorna la entidad
  
    
}