

// observador
interface Observer {
   update(): void ;
 
}
 //escuchador

interface Subject {
subscribe(observer: Observer): void;
unsubcribe(observer: Observer): void;
notify(): void;
}

class Observable implements Subject {
 private observer: Observer[]= [];

    // Agregar el observer al arreglo
    subscribe(observer: Observer): void {
        throw new Error("Method not implemented.");
    }

    // se filtran los datos y se eliminan todos excepto el que se para por parametro

    unsubcribe(observer: Observer): void {
        throw new Error("Method not implemented.");
    }

    // recorre la lista y notifica los cambios
    notify(): void {
        throw new Error("Method not implemented.");
    }
   
  }
  
  class SomeObserver implements Observer {
      update(): void {
          throw new Error("Method not implemented.");
      }
    
  }
  
  //Implementar los  observadores
  class SomeObserver2 implements Observer {
      update(): void {
          throw new Error("Method not implemented.");
      }
    
  }
  

  // crea los observables
  const ob = new Observable();
  const o = new SomeObserver();
  const o2 = new SomeObserver2();
  

  
  ob.subscribe(o);
  ob.subscribe(o2);
  ob.notify();
  ob.notify();