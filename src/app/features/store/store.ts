import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../../core/services/shop.service';
import { ItemListing } from '../../core/components/item-listing/item-listing';
import { Pagination } from '../../core/components/pagination/pagination';
import { PageSizeSelector } from '../../core/components/page-size-selector/page-size-selector';
import { LocationFilter } from '../../core/components/location-filter/location-filter';
import { SortToggle } from '../../core/components/sort-toggle/sort-toggle';
import { Country, Item, SortDir } from '../../core/models/models';

@Component({
  selector: 'app-store',
  imports: [ItemListing, Pagination, PageSizeSelector, LocationFilter, SortToggle],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class Store implements OnInit {
  readonly shop = inject(ShopService);
  private readonly router = inject(Router);

  readonly from = computed(() => (this.shop.page() - 1) * this.shop.pageSize() + 1);
  readonly to = computed(() => Math.min(this.shop.page() * this.shop.pageSize(), this.shop.total()));

  ngOnInit() { this.shop.loadItems(); }

  onInspect(item: Item) {
    this.shop.selectedItem.set(item);
    this.router.navigate(['/store', item.id]);
  }

  onPageChange(p: number) { this.shop.setPage(p); this.shop.loadItems(); }
  onSizeChange(s: number) { this.shop.setPageSize(s); this.shop.loadItems(); }
  onCountryChange(c: Country) { this.shop.setCountry(c); this.shop.loadItems(); }
  onSortChange(d: SortDir) { this.shop.setSort(d); this.shop.loadItems(); }
}