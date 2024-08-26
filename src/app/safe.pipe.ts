import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
