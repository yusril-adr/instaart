import Templates from '../views/templates/templates-creator.js';

const HeaderInitiator = {
  async init({ 
    header, user
  }) {
    header.innerHTML = user? Templates.loginHeader(user) : Templates.header();
  },

  async collapse() {
    $('.navbar-collapse').collapse('hide');
  },
};

export default HeaderInitiator;
