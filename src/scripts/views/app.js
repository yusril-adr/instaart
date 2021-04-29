import HeaderInitiator from '../utils/header-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import User from '../data/user';
import TitleHelper from '../utils/title-helper';

class App {
  constructor({
    header, content,
  }) {
    this._header = header;
    this._content = content;

    this._initialAppShell();
  }

  async initUser() {
    try {
      this._user = await User.getUser();
    } catch (error) {
      this._user = null;
    }

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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

export default App;
