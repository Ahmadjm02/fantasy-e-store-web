import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly msg = inject(MessageService);

  readonly email = signal('demo@example.com');
  readonly password = signal('demo1234');
  readonly loading = signal(false);

  submit() {
    this.loading.set(true);
    this.auth.login(this.email(), this.password()).subscribe({
      next: () => this.router.navigate(['/store']),
      error: (e) => {
        this.loading.set(false);
        this.msg.add({ severity: 'error', summary: 'Access denied', detail: e.error?.detail ?? 'Login failed' });
      },
    });
  }
}