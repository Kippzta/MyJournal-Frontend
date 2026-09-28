import { computed, Injectable, signal } from '@angular/core';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  // nyckeln som används för att lagra credentials i sessionStorage
  private readonly authStorageKey = 'credentials';

  // signal som håller reda på om användaren är inloggad eller inte. 
  // startar med att kolla om det finns credentials sessionStorage
  credentials = signal<Credentials | null>(this.checkStorage())

  // computed uppdaterar sig automatiskt när signalen credentials ändras 
  // och returnerar true om credentials inte är null, annars false.
  isLoggedIn = computed(() => this.credentials() !== null);


  // Kollar om det finns credentials i sessionStorage och returnerar det som startvärde
  // för credentials signalen annars returneras null.
  private checkStorage(): Credentials | null {

    const storedCredentials = sessionStorage.getItem(this.authStorageKey);

    // OM det finns credentials i sessionStorage, parsa och returnera dem, annars returnera null
    return storedCredentials !== null ? JSON.parse(storedCredentials) : null;
  }

  logout() {

    this.credentials.set(null);
    sessionStorage.removeItem(this.authStorageKey);

  }

}
