import { EgresosService } from './../egresos.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BilleteraVirtualService } from '../billetera-virtual.service';
import { IngresosService } from '../ingresos.service';

@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css',
})
export class CabeceroComponent {
  private presupuestoDisponible!: number;
  private ingresosTotales!: number;
  private egresosTotales!: number;
  // private porcentajeTotal!: number;

  constructor(
    private billeteraVirtual: BilleteraVirtualService,
    private ingresosService: IngresosService,
    private egresosService: EgresosService
  ) {}

  ngOnInit(): void {
    this.presupuestoDisponible =
      this.billeteraVirtual.getPresupuestoDisponible();
    this.ingresosTotales = this.ingresosService.getTotalIngresos();
    this.egresosTotales = this.egresosService.getTotalEgresos();
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
}
