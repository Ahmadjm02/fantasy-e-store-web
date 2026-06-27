import { Component, computed, input, output } from '@angular/core';

type PageItem = number | '...';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  readonly page = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly pageChange = output<number>();

  readonly pages = computed<PageItem[]>(() => {
    const total = this.totalPages();
    const cur = this.page();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const result: PageItem[] = [1];
    const lo = Math.max(2, cur - 2);
    const hi = Math.min(total - 1, cur + 2);

    if (lo > 2) result.push('...');
    for (let i = lo; i <= hi; i++) result.push(i);
    if (hi < total - 1) result.push('...');
    result.push(total);

    return result;
  });

  prev() { if (this.page() > 1) this.pageChange.emit(this.page() - 1); }
  next() { if (this.page() < this.totalPages()) this.pageChange.emit(this.page() + 1); }
  go(p: number) { if (p !== this.page()) this.pageChange.emit(p); }
}