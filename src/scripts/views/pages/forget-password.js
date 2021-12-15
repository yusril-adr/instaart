import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import User from '../../data/user';
import TitleHelper from '../../utils/title-helper';

const forgetPassword = {
  async render() {
    return Templates.forgetPasswordPage();
  },

  async afterRender(user) {
    if (user) {
      window.location.hash = '#/explore/';
      return;
    }

    await TitleHelper.setTitle('Lupa Password');

    await this._initSubmitEvent();
  },

  async _initSubmitEvent() {
    const form = document.querySelector('form#forget-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const email = event.target.email.value;

      try {
        await Swal.showLoading();
        const { token } = await User.getRecoveryToken(email);
        const userData = {
          email,
          recovery_token: token,
        };

        await User.sendRecoveryToken(userData);

        await Swal.fire(
          'Link Pemulihan Berhasil Dikirim.',
          'Jangan lupa lihat folder spam, bila email kami tidak masuk.',
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
  },
};

export default forgetPassword;
