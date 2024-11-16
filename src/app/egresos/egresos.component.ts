import { IngresosService } from './../ingresos.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Transaccion } from '../models/transaccion.model';
import { EgresosService } from '../egresos.service';
import { CommonModule } from '@angular/common';
import { FloorPipe } from '../pipes/entero.pipe';

@Component({
  selector: 'app-egresos',
  standalone: true,
  imports: [CommonModule, FloorPipe],
  templateUrl: './egresos.component.html',
  styleUrl: './egresos.component.css',
})
export class EgresosComponent {
  listadoEgresos!: Transaccion[];
  totalIngresos!: number;

  constructor(
    private egresosService: EgresosService,
    private ingresosService: IngresosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listadoEgresos = this.egresosService.getListaEgresos();
    this.totalIngresos = this.ingresosService.getTotalIngresos();
    this.cdr.detectChanges();
  }
}
