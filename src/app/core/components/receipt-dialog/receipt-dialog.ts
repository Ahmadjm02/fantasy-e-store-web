import { Component, input, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Order } from '../../models/models';
import { ItemPricePipe } from '../../pipes/item-price.pipe';

@Component({
  selector: 'app-receipt-dialog',
  imports: [Dialog, ItemPricePipe],
  templateUrl: './receipt-dialog.html',
  styleUrl: './receipt-dialog.scss',
})
export class ReceiptDialog {
  readonly order = input<Order | null>(null);
  readonly visible = input.required<boolean>();
  readonly close = output<void>();

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}