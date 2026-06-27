import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'itemPrice', standalone: true })
export class ItemPricePipe implements PipeTransform {
  transform(price: string, location: 'JO' | 'SA'): string {
    const currency = location === 'JO' ? 'JOD' : 'SAR';
    return `${price} ${currency}`;
  }
}
