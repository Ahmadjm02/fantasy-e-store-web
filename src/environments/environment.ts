/**
 * Production environment.
 *
 * `apiUrl` is the base URL prepended to every backend request by `ApiService`.
 * Leave it empty to call the backend same-origin (e.g. behind a reverse proxy),
 * or set it to the deployed API origin, e.g. 'https://api.example.com'.
 */
export const environment = {
  production: true,
  apiUrl: '',
  itemListDelay: 0,
  purchaseDelay: 0,
};
