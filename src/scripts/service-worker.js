importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

const CACHE_NAME = "instaart";

workbox.core.setCacheNameDetails({
  prefix: CACHE_NAME,
  suffix: "v1",
  precache: "cache",
  runtime: "cache",
})

workbox.precaching.precacheAndRoute([
  {url: "./index.html", revision: 1.1},
  {url: "./manifest.json", revision: 1},
  {url: "./public/fonts/Montserrat-Black.ttf", revision: null},
  {url: "./public/fonts/Montserrat-Regular.ttf", revision: null},
  {url: "./public/fonts/Redressed-Regular.ttf", revision: null},
  {url: "./public/fonts/Segoe UI Bold Italic.woff", revision: null},
  {url: "./public/fonts/Segoe UI Bold.woff", revision: null},
  {url: "./public/fonts/Segoe UI Italic.woff", revision: null},
  {url: "./public/fonts/Segoe UI.woff", revision: null},
  {url: "./public/images/maskable_logo.png", revision: 1},
  {url: "./public/images/logo.png", revision: 1},
  {url: "./public/images/illusts/404.png", revision: 1},
  {url: "./public/images/illusts/work.svg", revision: 1},
  {url: "./public/images/users/default_user.png", revision: 1},
  {url: "./scripts/index.js", revision: 1},
  {url: "./scripts/data/post.js", revision: 1},
  {url: "./scripts/data/user.js", revision: 1},
  {url: "./scripts/global/api-endpoint.js", revision: 1},
  {url: "./scripts/global/config.js", revision: 1},
  {url: "./scripts/routes/routes.js", revision: 1},
  {url: "./scripts/routes/url-parser.js", revision: 1},
  {url: "./scripts/utils/date-helper.js", revision: 1},
  {url: "./scripts/utils/header-initiator.js", revision: 1},
  {url: "./scripts/utils/password-helper.js", revision: 1},
  {url: "./scripts/utils/title-helper.js", revision: 1},
  {url: "./scripts/views/app.js", revision: 1},
  {url: "./scripts/views/pages/edit-password.js", revision: 1},
  {url: "./scripts/views/pages/edit-post.js", revision: 1},
  {url: "./scripts/views/pages/edit-profile-picture.js", revision: 1},
  {url: "./scripts/views/pages/edit-profile.js", revision: 1},
  {url: "./scripts/views/pages/explore.js", revision: 1},
  {url: "./scripts/views/pages/home.js", revision: 1},
  {url: "./scripts/views/pages/new-post.js", revision: 1},
  {url: "./scripts/views/pages/post.js", revision: 1.1},
  {url: "./scripts/views/pages/profile.js", revision: 1},
  {url: "./scripts/views/pages/search-post.js", revision: 1},
  {url: "./scripts/views/pages/search-user.js", revision: 1},
  {url: "./scripts/views/pages/sign-out.js", revision: 1},
  {url: "./scripts/views/pages/sign-up.js", revision: 1},
  {url: "./scripts/views/templates/templates-creator.js", revision: 1.1},
  {url: "./styles/style.css", revision: 1},
]);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  ({request}) => request.url.includes('api'),
  new workbox.strategies.NetworkFirst()
);
