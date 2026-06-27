import { Component, inject, input, output } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Item } from '../../models/models';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-item-listing',
  imports: [ProductCard],
  templateUrl: './item-listing.html',
  styleUrl: './item-listing.scss',
})
export class ItemListing {
  readonly items = input.required<Item[]>();
  readonly inspect = output<Item>();

  readonly isMobile = toSignal(
    inject(BreakpointObserver).observe('(max-width: 760px)').pipe(map(r => r.matches)),
    { initialValue: false }
  );
}