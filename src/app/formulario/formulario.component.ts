import { IngresosService } from './../ingresos.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EgresosService } from '../egresos.service';
import { Transaccion } from '../models/transaccion.model';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  descripcionInput: string = '';
  valorInput: number | null = null;
  @ViewChild('selectElement') selectElement!: ElementRef;

  constructor(
    private ingresosService: IngresosService,
    private egresosService: EgresosService
  ) {}

  addTransaccion(): void {
    if (
      this.descripcionInput.trim() === '' ||
      this.valorInput === null ||
      this.valorInput <= 0
    ) {
      console.log('Ingrese valores correctos');
      return;
    }

    let nuevaTransaccion: Transaccion = new Transaccion(
      this.descripcionInput,
      this.valorInput
    );

    let valorSelect: string = this.selectElement.nativeElement.value;

    switch (valorSelect) {
      case 'ingresoOperacion':
        this.ingresosService.addIngreso(nuevaTransaccion);
        break;
      case 'egresoOperacion':
        this.egresosService.addEgreso(nuevaTransaccion);
        break;
      default:
        console.error('Bad_Input');
    }

    this.descripcionInput = '';
    this.valorInput = null;
    this.selectElement.nativeElement.value = 'ingresoOperacion';
  }
}
