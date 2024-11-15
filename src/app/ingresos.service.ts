import { Injectable } from '@angular/core';
import { Transaccion } from './models/transaccion.model';

@Injectable({
  providedIn: 'root',
})
export class IngresosService {
  private listaIngresos: Transaccion[] = [
    new Transaccion('salario', 4000),
    new Transaccion('venta coche', 500),
  ];

  constructor() {}

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
