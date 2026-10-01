# Min Journal – Frontend

Frontend för "My Journal", byggd med Angular. Låter användare registrera sig, logga in, skriva anteckningar taggade med humör, se sitt flöde och statistik över tid.

## Teknikstack

- **Angular 21** (standalone components, signals, kontrollflödessyntax `@if`/`@for`)
- **Reaktiva formulär** (`ReactiveFormsModule`)
- **Basic Auth** mot backend, via en egen HTTP-interceptor

## Kom igång

### Krav

- Node.js v24.12.0
- Angular CLI
- Backend måste köra samtidigt, se [backend-repot](https://github.com/Kippzta/myjournal-backend)

### Installation

```bash
npm install
```

### Starta

```bash
ng serve
```

Appen körs på `http://localhost:4200`. Se till att backend kör på `http://localhost:8080` samtidigt, annars fungerar inga anrop.

## Struktur

```
src/app/
├── components/     Sidorna i appen (login, register, journal)
├── services/       AuthService, PostService, StatisticsService – pratar med backend
├── guards/         authGuard, skyddar routes som kräver inloggning
├── interceptor/    authInterceptor, lägger till Authorization-headern automatiskt
└── models/         TypeScript-interfaces som speglar backendens DTO:er
```

## Hur autentiseringen fungerar

Backend använder Basic Auth, vilket innebär att varje skyddat anrop måste innehålla en `Authorization`-header. detta är hur jag delade upp det:

1. **`Auth`-tjänsten** håller inloggningsstatus i en signal, sparad i `sessionStorage` så att när sidan laddas om så loggas man inte ut.
2. **`buildAuthHeader`** bygger själva headervärdet: användarnamn och lösenord kodas till Base64 och läggs till efter ordet `Basic` eftersom headern måste ha formen Authorization: Basic <username:password> (fast "<username:password>" kodat till Base64).
3. **`authInterceptor`** fångar upp varje utgående HTTP-anrop och lägger till headern automatiskt, om användaren är inloggad, annars skickar den vidare annropet utan någon förändring.

## Reflektion – problem jag stötte på och hur jag löste dem

**Repetitiva headers.** När jag byggde `login()` insåg jag att jag skulle behöva skicka med `Authorization`-headern i varje anrop till en skyddad endpoint. Att skriva det manuellt i varje komponent skulle göra att man upprepar samma kod flera gånger. Jag sökte efter om Angular kan hantera det här, och hittade HTTP-interceptors. Jag byggde en `authInterceptor`, som automatiskt lägger till headern på varje anrop, om användaren är inloggad. För att den skulle aktiveras behövde jag registrera den i `app.config.ts`, med `provideHttpClient(withInterceptors([authInterceptor]))`. Detta sätter grundförutsättningen att när en HttpClient gör ett anrop så körs interceptorn automatiskt.

## Dokumentation och källor jag använt

- **Angular HTTP Interceptors** 
  https://angular.dev/guide/http/interceptors

- **Angular Reactive Forms** 
  https://angular.dev/guide/forms/reactive-forms

- **Angular Signals** 
  https://angular.dev/guide/signals

- **Angular Route Guards (CanActivate)** 
  https://angular.dev/guide/routing/route-guards

- **MDN: btoa() och Unicode-problemet** – Innan när jag konverterade uppgifterna till backend så vart det fel när jag använde å , ä eller ö. Var tvungen att använda en TextEncoder för att det skulle fungera.
  https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa

- **MDN: HTTP Authentication (Basic Auth)** – hur Authorization-headern och base64-kodningen fungerar
  https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication

- **Quarkus: Basic Authentication med Jakarta Persistence** – hur `quarkus-security-jpa` kopplar Basic Auth till en databastabell
  https://quarkus.io/guides/security-getting-started-tutorial/
