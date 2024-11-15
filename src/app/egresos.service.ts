import { Injectable } from '@angular/core';
import { Transaccion } from './models/transaccion.model';

@Injectable({
  providedIn: 'root',
})
export class EgresosService {
  private listaEgresos: Transaccion[] = [
    new Transaccion('renta depto', 900),
    new Transaccion('ropas', 200),
    new Transaccion('celular', 1200),
  ];

  constructor() {}

  getListaEgresos(): Transaccion[] {
    return this.listaEgresos;
  }

  getTotalEgresos(): number {
    let totalEgresos: number = 0;

    for (let transaccion of this.listaEgresos) {
      totalEgresos += transaccion.getMonto();
    }

    return totalEgresos;
  }

  addIngreso(transaccion: Transaccion): void {
    this.listaEgresos.push(transaccion);
  }

  deleteIngreso(transaccion: Transaccion): void {
    const index = this.listaEgresos.findIndex(
      (ingreso) =>
        ingreso.getDescripcion() === transaccion.getDescripcion() &&
        ingreso.getMonto() === transaccion.getMonto()
    );
    if (index !== -1) {
      this.listaEgresos.splice(index, 1);
    }
  }
}
