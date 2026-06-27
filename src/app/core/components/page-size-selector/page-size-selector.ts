import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-page-size-selector',
  imports: [],
  templateUrl: './page-size-selector.html',
  styleUrl: './page-size-selector.scss',
})
export class PageSizeSelector {
  readonly current = input.required<number>();
  readonly sizeChange = output<number>();
  readonly sizes = [10, 20, 50];

  select(s: number) { this.sizeChange.emit(s); }
}