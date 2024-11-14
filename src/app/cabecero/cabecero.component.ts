import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BilleteraVirtualService } from '../billetera-virtual.service';

@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css',
})
export class CabeceroComponent {
  private presupuestoDisponible!: number;
  private ingresos!: number;
  private egresos!: number;
  // private porcentajeTotal!: number;

  constructor(private billeteraVirtual: BilleteraVirtualService) {}

  ngOnInit(): void {
    this.presupuestoDisponible =
      this.billeteraVirtual.getPresupuestoDisponible();
    this.ingresos = this.billeteraVirtual.getIngresos();
    this.egresos = this.billeteraVirtual.getEgresos();
  }

  getPresupuestoDisponible(): number {
    return this.presupuestoDisponible;
  }

  getIngresos(): number {
    return this.ingresos;
  }

  getEgresos(): number {
    return this.egresos;
  }
}
