import { Component, input, output } from '@angular/core';
import { SortDir } from '../../models/models';

@Component({
  selector: 'app-sort-toggle',
  imports: [],
  templateUrl: './sort-toggle.html',
  styleUrl: './sort-toggle.scss',
})
export class SortToggle {
  readonly sort = input<SortDir>('');
  readonly sortChange = output<SortDir>();

  private readonly cycleMap: Record<SortDir, SortDir> = { '': 'asc', asc: 'desc', desc: '' };
  private readonly iconMap: Record<SortDir, string> = { '': '⇅', asc: '↑', desc: '↓' };
  private readonly labelMap: Record<SortDir, string> = { '': 'PRICE', asc: 'LOW→HIGH', desc: 'HIGH→LOW' };

  icon() { return this.iconMap[this.sort()]; }
  label() { return this.labelMap[this.sort()]; }
  toggle() { this.sortChange.emit(this.cycleMap[this.sort()]); }
}