import { Injectable } from '@angular/core';
import { Transaccion } from './models/transaccion.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresosService {
  private listaIngresos: Transaccion[] = [
    new Transaccion('salario', 4000),
    new Transaccion('venta coche', 500),
  ];

  private ingresosSubject = new BehaviorSubject<number>(
    this.getTotalIngresos()
  );
  ingresos$ = this.ingresosSubject.asObservable();

  constructor() {}

  actualizarIngresosTotales(): Observable<number> {
    console.log('Observable metodo');
    return of(this.getTotalIngresos());
  }

  getListaIngresos(): Transaccion[] {
    return this.listaIngresos;
  }

  getTotalIngresos(): number {
    let totalIngresos: number = 0;

    for (let transaccion of this.listaIngresos) {
      totalIngresos += transaccion.getMonto();
    }

    return totalIngresos;
  }

  addIngreso(transaccion: Transaccion): void {
    this.listaIngresos.push(transaccion);
    this.ingresosSubject.next(this.getTotalIngresos());
    console.log(`${transaccion.getDescripcion()} agregado`);
  }

  deleteIngreso(transaccion: Transaccion): void {
    const index = this.listaIngresos.findIndex(
      (ingreso) =>
        ingreso.getDescripcion() === transaccion.getDescripcion() &&
        ingreso.getMonto() === transaccion.getMonto()
    );
    if (index !== -1) {
      this.listaIngresos.splice(index, 1);
    }
  }
}
