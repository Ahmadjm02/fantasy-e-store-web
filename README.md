# Fantasy E-Store — Frontend

Angular 20 client for a fantasy digital-item store. Provides login, a paginated
product listing, product details, a purchase flow, and a receipt — all talking to
the backend API over HttpOnly-cookie authentication.

> Backend is a separate application running at `http://localhost:8000`.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Angular 20 (standalone components, signals, zoneless change detection) |
| UI / theming | PrimeNG 20 + custom `FantasyPreset`, Tailwind CSS 4 utilities |
| HTTP | `HttpClient` with a functional auth interceptor |
| Auth state | Angular service + signals (no NgRx — see design notes) |
| Cookies | `ngx-cookie-service` (session-presence flag only) |

## Prerequisites

- Node version pinned in [`.nvmrc`](.nvmrc) (`nvm use`)
- npm
- The backend running and reachable at `http://localhost:8000`

## Setup

```bash
nvm use            # use the pinned Node version
npm install
```

## Run (development)

```bash
npm start          # ng serve on http://localhost:4200
```

`npm start` serves the app **with the dev proxy** ([`proxy.conf.json`](proxy.conf.json)),
which forwards these path prefixes to the backend at `http://localhost:8000`:

```
/auth   /items   /purchase   /health
```

The frontend itself calls the backend with **relative paths** (`apiUrl` is empty in
[`environment.development.ts`](src/environments/environment.development.ts)), so in dev
everything is same-origin via the proxy. This is what keeps the HttpOnly auth cookie
flowing automatically (see design notes).

Demo credentials are pre-filled on the login screen (`demo@example.com` / `demo1234`);
the actual valid credentials are defined by the backend.

## Build (production)

```bash
npm run build      # outputs to dist/
```

For production, set `apiUrl` in [`environment.ts`](src/environments/environment.ts) to the
deployed API origin (e.g. `https://api.example.com`), **or** leave it empty and put the API
behind the same origin via a reverse proxy. [`nginx.conf`](nginx.conf) and the
[`Dockerfile`](Dockerfile) cover the containerized same-origin setup.

## Project structure

```
src/app/
  core/
    components/   reusable UI (product-card, pagination, dialogs, filters, …)
    layout/       auth-guarded shell: header + <router-outlet>
    services/     api / auth / shop  (signal-based state)
    guards/       authGuard, loginGuard (functional)
    interceptors/ authInterceptor (functional)
    pipes/        item-price (JO→JOD, SA→SAR)
    models/       typed API contracts
    data/         product image map
    theme/        PrimeNG FantasyPreset
  features/       pages: login, store, details, receipt
```

## Routes

| Path | Page | Guard |
|---|---|---|
| `/login` | Login | `loginGuard` (redirects to `/store` if already authed) |
| `/store` | Product listing (paginated grid) | `authGuard` |
| `/store/:id` | Product details + Buy | `authGuard` |
| `/receipt/:orderId` | Receipt | `authGuard` |
| `**` | → `/login` | — |

## Design decisions

- **HttpOnly cookie auth instead of localStorage token.** The auth token is set by the
  backend as an HttpOnly cookie and is never readable by JavaScript, which removes the XSS
  token-theft surface. Every request goes out with `withCredentials: true`
  ([`auth.interceptor.ts`](src/app/core/interceptors/auth.interceptor.ts)) so the browser
  attaches the cookie automatically. The frontend keeps only a non-sensitive
  `fs_session` flag cookie to know "logged in or not" for guard/UI purposes.
- **Single `ApiService` chokepoint.** All backend URLs live in one place; no component
  inlines a URL. Base origin comes from the environment file.
- **Signal-based services for state, not NgRx.** App state (auth, catalog, selected item,
  last order) lives in `AuthService` / `ShopService` as signals. For an app this size that
  is enough and far less boilerplate than a full store.
- **Unauthenticated handling, two layers.** `authGuard` blocks navigation; the interceptor
  also catches any `401` from the API, clears the session, and redirects to `/login` —
  covering cookie expiry mid-session.
- **Responsive (desktop + mobile).** Listing uses CSS Grid `auto-fill / minmax`; details
  switches to a single column under 760px via `BreakpointObserver`. Other breakpoints are
  intentionally out of scope per the assignment.
- **Pricing pipe.** `price` is a decimal string from the backend; the `itemPrice` pipe
  appends the currency by location (`JO → JOD`, `SA → SAR`).
- **Artificial loading delays.** `itemListDelay` / `purchaseDelay` in the dev environment
  exist only to exercise the loading overlay; both are `0` in production.

## Assumptions

- Backend owns authentication and sets/clears the HttpOnly cookie; the frontend never sees
  the raw token.
- Purchase is **one item per request**; the purchase response returns the full order
  (`Order` model) used to render the receipt — there is **no GET-order-by-id endpoint**, so
  the receipt reads the just-created order from app state. Refreshing the receipt URL
  directly redirects to the store.
- API contract matches [`models.ts`](src/app/core/models/models.ts): paginated `/items`
  (`page`, `pageSize`, optional `country`, `sort`), `/items/:id`, `POST /purchase`,
  `/auth/login` · `/auth/logout` · `/auth/me`.
- Product images are mapped client-side from item title (the CSV/back end carries no image
  URL).