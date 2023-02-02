

// clase unica

 class Singleton{
    private static instancia: Singleton;

    data: string;
 
 // constructor privado   
private constructor(){
  
}
 
// metodo para validar y obtener la instancia
   static obtenerInstancia(){
    if(!Singleton.instancia) {  // si no exite una instancia creara una
        Singleton.instancia = new Singleton();
    }
    // si existe la instancia la retornara
    return Singleton.instancia;
 } 
}
 
// variables para exponer la instancia 
const instancia1 = Singleton.obtenerInstancia();
console.log(instancia1.data)
const instancia2 = Singleton.obtenerInstancia();
console.log(instancia2.data)

// verificasmos que las referencias de la instancia son las mismas , se espera un true
console.log(instancia1 === instancia2);

