import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'ledStateValue'})
export class LedStatePipe implements PipeTransform {
  transform(value: string): string {
    console.log(value);
    return value ? 'On' : 'Off';
  }
}
