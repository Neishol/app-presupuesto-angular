import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BilleteraVirtualService {
  private presupuestoDisponible: number | null;
  private ingresos: number | null;
  private egresos: number | null;

  //pasar lineas de codigo de cabecera a este servicio
  constructor() {
    this.presupuestoDisponible = 3400;
    this.ingresos = 4500;
    this.egresos = 1100;
  }

  getPresupuestoDisponible(): number {
    return this.presupuestoDisponible ?? 0;
  }

  getIngresos(): number {
    return this.ingresos ?? 0;
  }

  getEgresos(): number {
    return this.egresos ?? 0;
  }
}
