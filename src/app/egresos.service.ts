import { Injectable } from '@angular/core';
import { Transaccion } from './models/transaccion.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EgresosService {
  private listaEgresos: Transaccion[] = [
    new Transaccion('renta depto', 900),
    new Transaccion('ropas', 200),
    new Transaccion('celular', 1200),
  ];

  private egresosSubject = new BehaviorSubject<number>(this.getTotalEgresos());
  egresos$ = this.egresosSubject.asObservable();

  constructor() {}

  actualizarEgresosTotales(): Observable<number> {
    return of(this.getTotalEgresos());
  }

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

  addEgreso(transaccion: Transaccion): void {
    this.listaEgresos.push(transaccion);
    this.egresosSubject.next(this.getTotalEgresos());
  }

  deleteEgreso(transaccion: Transaccion): void {
    const index = this.listaEgresos.findIndex(
      (Egreso) =>
        Egreso.getDescripcion() === transaccion.getDescripcion() &&
        Egreso.getMonto() === transaccion.getMonto()
    );
    if (index !== -1) {
      this.listaEgresos.splice(index, 1);
    }
  }
}
