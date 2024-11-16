import { ChangeDetectorRef, Component } from '@angular/core';
import { IngresosService } from '../ingresos.service';
import { Transaccion } from '../models/transaccion.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.css',
})
export class IngresosComponent {
  listadoIngresos!: Transaccion[];

  constructor(
    private ingresosService: IngresosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listadoIngresos = this.ingresosService.getListaIngresos();
    this.cdr.detectChanges();
  }
}
