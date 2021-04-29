import Templates from '../views/templates/templates-creator.js';

const HeaderInitiator = {
  async init({ 
    header, user
  }) {
    header.innerHTML = user? Templates.loginHeader(user) : Templates.header();

    return await this._initSearchEvent(header);
  },

  async _initSearchEvent(header) {
    const form = header.querySelector('form#navbar-search-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      const input = header.querySelector('input#navbar-search-input');
      location.hash = `#/search-post/${input.value? `${input.value}/` : ''}`;
      input.value = '';
      return;
    });
  },

  async collapse() {
    return $('.navbar-collapse').collapse('hide');
  },
};

export default HeaderInitiator;
