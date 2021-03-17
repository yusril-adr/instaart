import HeaderInitiator from '../utils/header-initiator.js';
import UrlParser from '../routes/url-parser.js';
import routes from '../routes/routes.js';
import User from '../data/user.js';
import TitleHelper from '../utils/title-helper.js';

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
    await HeaderInitiator.collapse();
    await this._scrollToTop();
    await TitleHelper.setDefaultTitle();

    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['/'];
    this._content.innerHTML = await page.render();
    await page.afterRender(this._user);
  }

  async _scrollToTop() {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

export default App;
