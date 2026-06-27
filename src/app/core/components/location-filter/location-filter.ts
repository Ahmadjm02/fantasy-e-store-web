import { Component, input, output } from '@angular/core';
import { Country } from '../../models/models';

@Component({
  selector: 'app-location-filter',
  imports: [],
  templateUrl: './location-filter.html',
  styleUrl: './location-filter.scss',
})
export class LocationFilter {
  readonly active = input<Country>('');
  readonly countryChange = output<Country>();

  toggle(c: Country) {
    this.countryChange.emit(this.active() === c ? '' : c);
  }
}