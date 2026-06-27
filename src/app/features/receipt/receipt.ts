import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../../core/services/shop.service';
import { ReceiptDialog } from '../../core/components/receipt-dialog/receipt-dialog';

@Component({
  selector: 'app-receipt',
  imports: [ReceiptDialog],
  templateUrl: './receipt.html',
  styleUrl: './receipt.scss',
})
export class Receipt implements OnInit {
  private readonly shop = inject(ShopService);
  private readonly router = inject(Router);

  readonly order = this.shop.lastOrder;
  readonly visible = signal(true);

  ngOnInit() {
    if (!this.order()) this.router.navigate(['/store']);
  }

  close() {
    this.shop.lastOrder.set(null);
    this.router.navigate(['/store']);
  }
}