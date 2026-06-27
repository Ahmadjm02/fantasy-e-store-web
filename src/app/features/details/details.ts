import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ShopService } from '../../core/services/shop.service';
import { ItemPricePipe } from '../../core/pipes/item-price.pipe';
import { getItemImage } from '../../core/data/product-images';
import { ConfirmDialog } from '../../core/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-details',
  imports: [ItemPricePipe, ConfirmDialog],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  readonly id = input.required<string>();

  private readonly shop = inject(ShopService);
  private readonly router = inject(Router);
  private readonly msg = inject(MessageService);

  readonly item = this.shop.selectedItem;
  readonly loading = this.shop.loading;
  readonly confirmVisible = signal(false);
  readonly isMobile = toSignal(
    inject(BreakpointObserver).observe('(max-width: 760px)').pipe(map(r => r.matches)),
    { initialValue: false }
  );

  ngOnInit() {
    this.shop.loadItem(Number(this.id())).subscribe({
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Not found' });
        this.router.navigate(['/store']);
      },
    });
  }

  getImage(): string { return this.item() ? getItemImage(this.item()!.title, this.item()!.id) : ''; }
  goStore() { this.router.navigate(['/store']); }

  buy() { this.confirmVisible.set(true); }

  confirmBuy() {
    if (!this.item()) return;
    this.shop.purchase(this.item()!.id).subscribe({
      error: (e) => {
        this.confirmVisible.set(false);
        this.msg.add({ severity: 'error', summary: 'Purchase failed', detail: e.error?.detail });
      },
    });
  }

  cancelBuy() { this.confirmVisible.set(false); }
}