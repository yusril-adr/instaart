import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import TitleHelper from '../../utils/title-helper';
import UrlParser from '../../routes/url-parser';
import User from '../../data/user';

const searchUser = {
  async render() {
    return Templates.searchPage();
  },

  async afterRender() {
    let keyword = await UrlParser.parseActiveUrlWithoutCombiner().verb;
    if (!keyword) keyword = '';

    await TitleHelper.setTitle(`Search ${keyword}`);
    await this._setDefaultValue(keyword);
    await this._initNav(keyword);
    await this._renderResult(keyword);
    await this._initSearchForm(keyword);
  },

  async _setDefaultValue(keyword) {
    const inputSearch = document.querySelector('#search-input');
    inputSearch.value = keyword;
  },

  async _initNav(keyword) {
    const navSearch = document.querySelector('#search-nav');
    navSearch.innerHTML = Templates.searchUserNav(keyword);
  },

  async _renderResult(keyword) {
    try {
      const users = await User.searchUser(keyword);
      const container = document.querySelector('#result-container');

      if (users.length < 1 || keyword === '') {
        container.innerHTML = Templates.searchEmptyResult();
        return;
      }

      container.innerHTML = '';
      users.forEach(async (user) => {
        container.innerHTML += Templates.searchUserResult(user);
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );

      const container = document.querySelector('#result-container');
      container.innerHTML = Templates.searchEmptyResult();
    }
  },

  async _initSearchForm() {
    const form = document.querySelector('#search-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      window.location.hash = `#/search-user/${event.target['search-input'].value || ''}`;
    });
  },
};

export default searchUser;
