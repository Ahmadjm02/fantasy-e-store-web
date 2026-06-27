import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { LoadingOverlay } from '../../components/loading-overlay/loading-overlay';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, LoadingOverlay],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  private readonly auth = inject(AuthService);

  ngOnInit() {
    if (this.auth.authenticated() && !this.auth.currentUser()) {
      this.auth.fetchCurrentUser().subscribe();
    }
  }
}