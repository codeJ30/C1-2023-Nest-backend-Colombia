
import { Iforma } from './Iforma';
import { Cubo } from './Cubo';
import { Factory } from './factory';


const cubo: Iforma = Factory.crearForma(Factory.CUBO);

cubo.dibujarForma()