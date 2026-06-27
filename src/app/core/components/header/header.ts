import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly bp = inject(BreakpointObserver);

  readonly isMobile = toSignal(
    this.bp.observe('(max-width: 760px)').pipe(map(r => r.matches)),
    { initialValue: false },
  );

  readonly user = this.auth.currentUser;
  readonly loggingOut = signal(false);

  goStore() { this.router.navigate(['/store']); }

  logout() {
    this.loggingOut.set(true);
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.loggingOut.set(false),
    });
  }
}
