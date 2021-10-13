import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import PasswordHelper from '../../utils/password-helper';
import User from '../../data/user';

const home = {
  async render() {
    return Templates.signInpage();
  },

  async afterRender(user) {
    if (user) {
      window.location.hash = '#/explore/';
      return;
    }

    await this._initPasswordToggler();
    await this._initSignInEvent();
  },

  async _initPasswordToggler() {
    const input = document.querySelector('#password');
    const button = document.querySelector('#password-toggler');

    await PasswordHelper.initTogglerEvent(input, button);
  },

  async _initSignInEvent() {
    const signInForm = document.querySelector('#signin-form');
    signInForm.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      try {
        const identifier = event.target.identifier.value;
        const password = event.target.password.value;

        await User.signIn(identifier, password);

        const changeEvent = new CustomEvent('updateUser');
        window.dispatchEvent(changeEvent);

        window.location.hash = '#/explore/';
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
    });
  },
};

export default home;
