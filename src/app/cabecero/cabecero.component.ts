import { EgresosService } from './../egresos.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BilleteraVirtualService } from '../billetera-virtual.service';
import { IngresosService } from '../ingresos.service';
import { Transaccion } from '../models/transaccion.model';
import { FloorPipe } from '../pipes/entero.pipe';

@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [CommonModule, FloorPipe],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css',
})
export class CabeceroComponent {
  private presupuestoDisponible!: number;
  private ingresosTotales!: number;
  private egresosTotales!: number;
  private listaTotalEgresos!: Transaccion[];

  constructor(
    private ingresosService: IngresosService,
    private egresosService: EgresosService
  ) {}

  ngOnInit(): void {
    this.presupuestoDisponible =
      this.ingresosService.getTotalIngresos() -
      this.egresosService.getTotalEgresos();
    this.ingresosTotales = this.ingresosService.getTotalIngresos();
    this.egresosTotales = this.egresosService.getTotalEgresos();
    this.listaTotalEgresos = this.egresosService.getListaEgresos();
  }

  getPresupuestoDisponible(): number {
    return this.presupuestoDisponible;
  }

  getIngresosTotales(): number {
    return this.ingresosTotales;
  }

  getEgresosTotales(): number {
    return this.egresosTotales;
  }

  getPorcentajeTotalEgresos(): number {
    let porcentajeTotalEgresos: number = 0;
    for (let egreso of this.listaTotalEgresos) {
      porcentajeTotalEgresos += egreso.getPorcentajeConsumido(
        this.ingresosTotales
      );
    }

    return porcentajeTotalEgresos;
  }
}
