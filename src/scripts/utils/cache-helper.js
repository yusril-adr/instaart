import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import CONFIG from '../global/config';

const CacheHelper = {
  async routeAPI() {
    registerRoute(
      ({ request, url }) => (
        request.method.toUpperCase() === 'GET' && url.pathname.includes(CONFIG.API_BASE_URL)
      ),
      new NetworkFirst({
        networkTimeoutSeconds: 2,
        cacheName: CONFIG.CACHE_NAME.API,
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: CONFIG.CACHE_EXP,
          }),
        ],
      }),
    );
  },

  async routeImage() {
    registerRoute(
      ({ request }) => (
        request.destination === 'image'
      ),
      new CacheFirst({
        cacheName: CONFIG.CACHE_NAME.IMAGE,
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: CONFIG.CACHE_EXP,
          }),
        ],
      }),
    );
  },
};

export default CacheHelper;
