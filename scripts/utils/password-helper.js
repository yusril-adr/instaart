import Templates from '../views/templates/templates-creator.js';

const PasswordHelper = {
  async initTogglerEvent(input, button) {
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      input.type = input.type === 'password'? 'text' : 'password';

      button.ariaLabel = input.type === 'password'? 'Show password' : 'Hide password';
      button.innerHTML = input.type === 'password'? Templates.showPassswordToggler() : Templates.hidePasswordToggler();
    });
  },
};

export default PasswordHelper;
