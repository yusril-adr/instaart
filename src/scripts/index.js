import 'regenerator-runtime';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'select2/dist/css/select2.min.css';
import 'select2/dist/js/select2.min';
import '../styles/style.scss';

import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  header: document.querySelector('header'),
  content: document.querySelector('main'),
});

window.addEventListener('load', async () => {
  app.initUser();
  // swRegister();
});

window.addEventListener('hashchange', async (event) => {
  event.stopPropagation();
  app.renderPage();
});

window.addEventListener('updateUser', async () => {
  app.initUser();
});
