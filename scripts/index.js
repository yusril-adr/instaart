import App from './views/app.js';

const app = new App({
  header: document.querySelector('header'),
  content: document.querySelector('main'),
});

window.addEventListener('load', async () => {
  // bsCustomFileInput.init();
  app.initUser();
});

window.addEventListener('hashchange', async () => {
  app.renderPage();
});

window.addEventListener('signInOrOut', async () => {
  app.initUser();
});