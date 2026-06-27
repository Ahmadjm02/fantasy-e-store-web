/**
 * Development environment.
 *
 * `apiUrl` is left empty so requests are made same-origin (relative paths) and
 * picked up by the dev proxy (`proxy.conf.json`), which forwards /auth, /items,
 * /purchase and /health to the backend at http://localhost:8000. This keeps the
 * HttpOnly auth cookie same-origin so the browser sends it automatically.
 */
export const environment = {
  production: false,
  apiUrl: '',
  itemListDelay: 100,
  purchaseDelay: 1200,
};
