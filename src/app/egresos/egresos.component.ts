import { Component } from '@angular/core';
import { Transaccion } from '../models/transaccion.model';
import { EgresosService } from '../egresos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-egresos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './egresos.component.html',
  styleUrl: './egresos.component.css',
})
export class EgresosComponent {
  listadoEgresos!: Transaccion[];

  constructor(private egresosService: EgresosService) {}

  ngOnInit(): void {
    this.listadoEgresos = this.egresosService.getListaEgresos();
  }
}
