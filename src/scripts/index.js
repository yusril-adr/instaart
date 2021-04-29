import App from './views/app.js';
import swRegister from './utils/sw-register.js';

const app = new App({
  header: document.querySelector('header'),
  content: document.querySelector('main'),
});

window.addEventListener('load', async () => {
  app.initUser();
  swRegister();
});

window.addEventListener('hashchange', async (event) => {
  event.stopPropagation();
  app.renderPage();
});

window.addEventListener('updateUser', async () => {
  app.initUser();
});