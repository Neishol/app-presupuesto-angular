export class Transaccion {
  private _descripcion: string;
  private _monto: number;

  constructor(descripcion: string, monto: number) {
    this._descripcion = descripcion;
    this._monto = monto;
  }

  getDescripcion(): string {
    return this._descripcion;
  }

  getMonto(): number {
    return this._monto;
  }
}
