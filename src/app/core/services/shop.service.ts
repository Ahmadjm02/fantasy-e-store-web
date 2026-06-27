import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, EMPTY, delay, switchMap, tap, catchError } from 'rxjs';
import { ApiService } from './api.service';
import { Item, PagedItems, Order, SortDir, Country } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  // catalog state
  readonly page = signal(1);
  readonly pageSize = signal(10);
  readonly country = signal<Country>('');
  readonly sort = signal<SortDir>('');

  // response state
  readonly items = signal<Item[]>([]);
  readonly total = signal(0);
  readonly totalPages = signal(0);
  readonly loading = signal(false);

  // detail / purchase state
  readonly selectedItem = signal<Item | null>(null);
  readonly lastOrder = signal<Order | null>(null);

  private readonly loadTrigger$ = new Subject<void>();

  constructor() {
    this.loadTrigger$.pipe(
      switchMap(() => {
        this.loading.set(true);
        const params: Record<string, string | number> = {
          page: this.page(),
          pageSize: this.pageSize(),
          country: this.country(),
          sort: this.sort(),
        };
        return this.api.get<PagedItems>('/items', params).pipe(
          delay(environment.itemListDelay),
          tap({
            next: (res) => {
              this.items.set(res.items);
              this.total.set(res.total);
              this.totalPages.set(res.totalPages);
              this.loading.set(false);
            },
            error: () => this.loading.set(false),
          }),
          catchError(() => EMPTY),
        );
      }),
    ).subscribe();
  }

  loadItems(): void { this.loadTrigger$.next(); }

  loadItem(id: number) {
    this.loading.set(true);
    return this.api.get<Item>(`/items/${id}`).pipe(
      tap({
        next: (item) => {
          this.selectedItem.set(item);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      }),
    );
  }

  purchase(itemId: number) {
    this.loading.set(true);
    return this.api.post<Order>('/purchase', { itemId }).pipe(
      delay(environment.purchaseDelay),
      tap({
        next: (order) => {
          this.lastOrder.set(order);
          this.loading.set(false);
          this.router.navigate(['/receipt', order.orderId]);
        },
        error: () => this.loading.set(false),
      }),
    );
  }

  setPage(p: number) { this.page.set(p); }
  setPageSize(s: number) { this.pageSize.set(s); this.page.set(1); }
  setCountry(c: Country) { this.country.set(c); this.page.set(1); }
  setSort(s: SortDir) { this.sort.set(s); this.page.set(1); }
}