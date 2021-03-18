import App from './views/app.js';

const app = new App({
  header: document.querySelector('header'),
  content: document.querySelector('main'),
});

window.addEventListener('load', async () => {
  // bsCustomFileInput.init();
  app.initUser();
});

window.addEventListener('hashchange', async (event) => {
  event.stopPropagation();
  app.renderPage();
});

window.addEventListener('updateUser', async () => {
  app.initUser();
});