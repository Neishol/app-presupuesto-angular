import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entero',
  standalone: true,
})
export class FloorPipe implements PipeTransform {
  transform(value: number): number {
    return value / 100;
  }
}
