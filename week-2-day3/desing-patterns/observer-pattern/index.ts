

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
    [x: string]: any;
    subscribe(observer: Observer): void {
        throw new Error("Method not implemented.");
    }
    unsubcribe(observer: Observer): void {
        throw new Error("Method not implemented.");
    }
    notify(): void {
        throw new Error("Method not implemented.");
    }
   
  }
  
  class SomeObserver implements Observer {
      update(): void {
          throw new Error("Method not implemented.");
      }
    
  }
  
  class SomeObserver2 implements Observer {
      update(): void {
          throw new Error("Method not implemented.");
      }
    
  }
  
  const ob = new Observable();
  const o = new SomeObserver();
  const o2 = new SomeObserver2();
  
  ob.subscribe(o);
  ob.subscribe(o2);
  ob.notify();
  ob.unsubscribe(o);
  ob.notify();