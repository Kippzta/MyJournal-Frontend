import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',

  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'

})

export class App {

  protected auth = inject(AuthService);

  private router = inject(Router);

  logout() {

    this.auth.logout();
    this.router.navigate(['/login']);

  }

}
