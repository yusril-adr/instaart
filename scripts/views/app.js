import HeaderInitiator from '../utils/header-initiator.js';
import UrlParser from '../routes/url-parser.js';
import routes from '../routes/routes.js';
import User from '../data/user.js';

class App {
  constructor({
    header, content
  }) {
    this._header = header;
    this._content = content;

    this._initialAppShell();
  }

  async initUser() {
    this._user = await User.getUser();
    await this._initialAppShell();
    await this.renderPage();
  }

  async _initialAppShell() {
    await HeaderInitiator.init({
      header: this._header,
      user: this._user,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['/'];
    this._content.innerHTML = await page.render();
    await page.afterRender(this._user);
  }
}

export default App;
