import { Component, input, output } from '@angular/core';
import { Item } from '../../models/models';
import { ItemPricePipe } from '../../pipes/item-price.pipe';
import { getItemImage } from '../../data/product-images';

@Component({
  selector: 'app-product-card',
  imports: [ItemPricePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly item = input.required<Item>();
  readonly inspect = output<Item>();

  getImage(): string {
    return getItemImage(this.item().title, this.item().id);
  }
}