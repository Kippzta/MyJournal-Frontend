import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',

  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'

})

export class App {

  protected readonly title = signal('RÖV');

  protected auth = inject(Auth);

  private router = inject(Router);

  logout() {

    this.auth.logout();
    this.router.navigate(['/login']);

  }

}
