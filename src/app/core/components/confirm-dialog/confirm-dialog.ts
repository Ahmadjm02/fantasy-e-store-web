import { Component, input, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ItemPricePipe } from '../../pipes/item-price.pipe';
import { Item } from '../../models/models';

@Component({
  selector: 'app-confirm-dialog',
  imports: [Dialog, ItemPricePipe],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
  readonly item = input.required<Item>();
  readonly visible = input.required<boolean>();
  readonly loading = input<boolean>(false);
  readonly confirm = output<void>();
  readonly cancel = output<void>();
}