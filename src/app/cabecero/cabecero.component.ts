import { EgresosService } from './../egresos.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core';
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
  private listaTotalIngresos!: Transaccion[];

  constructor(
    private ingresosService: IngresosService,
    private egresosService: EgresosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.actualizarDatos();
    this.cdr.detectChanges();
    //A tener en cuenta, no se actualizaban los datos porque los datos que tenia almacenados
    //eran viejos, cuando se actualizaban los datos, se actualizaba la lista como tal pero nunca la suma total,
    //porque esos datos se actualizaban en el servicio, en cambio si hago un for propio como en los porcentajes,
    //si que se actualizan.

    // this.ingresosService.actualizarIngresosTotales().subscribe({
    //   next: (data) => {
    //     this.ingresosTotales = this.ingresosService.getTotalIngresos();
    //     console.log(
    //       `${this.ingresosTotales} es lo que se actualizo en suscribe`
    //     );
    //     this.actualizarDatos();
    //   },
    //   error: (error) => {
    //     console.error('Error al obtener los ingresos', error);
    //   },
    //   complete: () => {
    //     console.info('Actualización de ingresos completada');
    //   },
    // });

    // this.egresosService.actualizarEgresosTotales().subscribe({
    //   next: (data) => {
    //     this.egresosTotales = data;
    //     this.actualizarDatos();
    //   },
    //   error: (error) => {
    //     console.error('Error al obtener los egresos', error);
    //   },
    //   complete: () => {
    //     console.info('Actualización de egresos completada');
    //   },
    // });
    this.ingresosService.ingresos$.subscribe((updatedData) => {
      this.ingresosTotales = updatedData;
    });

    this.egresosService.egresos$.subscribe((updatedData) => {
      this.egresosTotales = updatedData;
    });
  }

  actualizarDatos(): void {
    this.presupuestoDisponible =
      this.ingresosService.getTotalIngresos() -
      this.egresosService.getTotalEgresos();
    this.ingresosTotales = this.ingresosService.getTotalIngresos();
    this.egresosTotales = this.egresosService.getTotalEgresos();
    this.listaTotalEgresos = this.egresosService.getListaEgresos();
    this.listaTotalIngresos = this.ingresosService.getListaIngresos();
  }

  //Voy a probar haciendo el for dentro de este componente
  // getPresupuestoDisponible(): number {
  //   return this.presupuestoDisponible;
  // }

  // getIngresosTotales(): number {
  //   return this.ingresosTotales;
  // }

  // getEgresosTotales(): number {
  //   return this.egresosTotales;
  // }

  getPresupuestoDisponible(): number {
    return this.ingresosTotales - this.egresosTotales;
  }

  getIngresosTotales(): number {
    let totalIngresos: number = 0;
    for (let ingreso of this.listaTotalIngresos) {
      totalIngresos += ingreso.getMonto();
    }
    return totalIngresos;
    // return this.ingresosTotales;
  }

  getEgresosTotales(): number {
    let totalEgresos: number = 0;
    for (let egreso of this.listaTotalEgresos) {
      totalEgresos += egreso.getMonto();
    }
    return totalEgresos;
    // return this.egresosTotales;
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
