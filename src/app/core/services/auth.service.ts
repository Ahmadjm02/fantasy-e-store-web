import { Injectable, inject, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthUser } from '../models/models';

const SESSION_COOKIE = 'fs_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly cookies = inject(CookieService);

  readonly authenticated = signal(this.cookies.check(SESSION_COOKIE));
  readonly currentUser = signal<AuthUser | null>(null);

  login(email: string, password: string) {
    return this.api.post<AuthUser>('/auth/login', { email, password }).pipe(
      tap((user) => {
        this.currentUser.set(user);
        this.authenticated.set(true);
        // non-sensitive session presence flag (not the HttpOnly auth token)
        this.cookies.set(SESSION_COOKIE, '1', { path: '/' });
      }),
    );
  }

  logout() {
    return this.api.post<{ message: string }>('/auth/logout', {}).pipe(
      tap(() => this.clearSession()),
    );
  }

  fetchCurrentUser() {
    return this.api.get<AuthUser>('/auth/me').pipe(
      tap((user) => this.currentUser.set(user)),
    );
  }

  clearSession() {
    this.authenticated.set(false);
    this.currentUser.set(null);
    this.cookies.delete(SESSION_COOKIE, '/');
  }
}
