import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import PasswordHelper from '../../utils/password-helper';
import UrlParser from '../../routes/url-parser';
import User from '../../data/user';
import TitleHelper from '../../utils/title-helper';
import CONFIG from '../../global/config';

const recovery = {
  async render() {
    return Templates.recoveryPage();
  },

  async afterRender(user) {
    if (user) {
      window.location.hash = '#/explore/';
      return;
    }

    const token = await UrlParser.parseActiveUrlWithoutCombiner().verb;
    if (!token) {
      window.location.hash = '#/sign-in/';
      return;
    }

    await TitleHelper.setTitle('Pemulihan Akun');
    await this._initPasswordToggler();

    try {
      const userData = await User.verifyRecoveryToken(token);
      await this._initSubmitEvent(userData);
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );

      window.location.href = '#/sign-in/';
    }
  },

  async _initPasswordToggler() {
    const inputNewPassword = document.querySelector('#new-password');
    const buttonNewPassword = document.querySelector('#new-password-toggler');
    await PasswordHelper.initTogglerEvent(inputNewPassword, buttonNewPassword);

    const inputCurrentPassword = document.querySelector('#confirm-password');
    const buttonCurrentPassword = document.querySelector('#confirm-password-toggler');
    await PasswordHelper.initTogglerEvent(inputCurrentPassword, buttonCurrentPassword);
  },

  async _initSubmitEvent(userData) {
    try {
      const form = document.querySelector('form#recovery-form');
      form.addEventListener('submit', async (event) => {
        event.stopPropagation();
        event.preventDefault();

        try {
          await Swal.showLoading();
          const inputData = {
            password: event.target['new-password'].value,
            confirm_password: event.target['confirm-password'].value,
            email: userData.email,
          };

          await this._formValidation(inputData);
          await User.recoveryPassword(inputData);

          await Swal.fire(
            'Berhasil!',
            'Password berhasil dirubah.',
            'success',
          );

          window.location.href = '#/sign-in';
        } catch (error) {
          await Swal.fire(
            'Oops ...',
            error.message,
            'error',
          );
          return;
        }
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },

  async _formValidation(input) {
    const { PASSWORD_MIN_LENGTH } = CONFIG;

    if (input.password !== input.confirm_password) {
      throw new Error('Password kamu tidak sama.');
    }

    if (input.password.length < PASSWORD_MIN_LENGTH) throw new Error('Password kamu terlalu sedikit.');
  },
};

export default recovery;
