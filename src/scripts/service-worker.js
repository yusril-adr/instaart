/* eslint-disable no-restricted-globals */
import 'regenerator-runtime';
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import CacheHelper from './utils/cache-helper';

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

CacheHelper.routeImage();
CacheHelper.routeAPI();
