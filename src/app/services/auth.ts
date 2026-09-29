import { computed, inject, Inject, Injectable, signal } from '@angular/core';
import { Credentials } from '../models/credentials';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})

export class Auth {

  // nyckeln som används för att lagra credentials i sessionStorage
  private readonly authStorageKey = 'credentials';

  private readonly postsUrl = 'http://localhost:8080/api/posts';

  private readonly regUrl = 'http://localhost:8080/api/auth/register';

  private http = inject(HttpClient);

  // signal som håller reda på om användaren är inloggad eller inte. 
  // startar med att kolla om det finns credentials sessionStorage
  credentials = signal<Credentials | null>(this.checkStorage());

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

  private save(credentials: Credentials) {
    this.credentials.set(credentials);
    sessionStorage.setItem(this.authStorageKey, JSON.stringify(credentials));
  }



  // Basic Auth header från credentials för att skicka med i varje requestu till servern.
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa
  buildAuthHeader(credentials: Credentials): string {


    const raw = `${credentials.username}:${credentials.password}`;

    // Var tvungen att göra så btoa kan hantera svenska tecken, 
    // gör om texten till en lista av bytes i UTF-8 format
    const utf8Bytes = new TextEncoder().encode(raw);


    //btoa metoden kräver en sträng som indata inte en lista 
    // packar upp byte listan till separata värden
    // sedan bygger en sträng av varje byte värde
    const binaryString = String.fromCharCode(...utf8Bytes);


    // gör om strängen till Base64 
    const encoded = btoa(binaryString);

    // returnerar authorization headervärdet
    return `Basic ${encoded}`;
  }


  register(credentials: Credentials) {

  
    return this.http.post<User>(this.regUrl, credentials);

  }


  // Anropar en skyddad endpoint för att verifiera uppgifterna. 
  // postsen som kommer tillbaks används inte, bara kollar att anropet lyckas eller inte 
  login(credentials: Credentials) {

    const request = this.http.get<Post[]>(this.postsUrl, {
      headers: { Authorization: this.buildAuthHeader(credentials) }
    });

    request.subscribe({
      next: () => this.save(credentials),
    })
    
    return request;
  };

}
