import { Component, inject } from '@angular/core';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-loading-overlay',
  imports: [],
  templateUrl: './loading-overlay.html',
  styleUrl: './loading-overlay.scss',
})
export class LoadingOverlay {
  readonly loading = inject(ShopService).loading;
}