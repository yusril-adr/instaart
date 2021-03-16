import Templates from '../views/templates/templates-creator.js';

const HeaderInitiator = {
  async init({ 
    header, user
  }) {
    header.innerHTML = user ? Templates.loginHeader() : Templates.header();
  },
};

export default HeaderInitiator;
