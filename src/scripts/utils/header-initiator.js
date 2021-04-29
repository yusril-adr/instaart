import $ from 'jquery';
import Templates from '../views/templates/templates-creator';

const HeaderInitiator = {
  async init({
    header, user,
  }) {
    header.innerHTML = user ? Templates.loginHeader(user) : Templates.header();

    return this._initSearchEvent(header);
  },

  async _initSearchEvent(header) {
    const form = header.querySelector('form#navbar-search-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      const input = header.querySelector('input#navbar-search-input');
      window.location.hash = `#/search-post/${input.value ? `${input.value}/` : ''}`;
      input.value = '';
    });
  },

  async collapse() {
    return $('.navbar-collapse').collapse('hide');
  },
};

export default HeaderInitiator;
