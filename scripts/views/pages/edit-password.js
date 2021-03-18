import Templates from '../templates/templates-creator.js';
import TitleHelper from '../../utils/title-helper.js';
import PasswordHelper from '../../utils/password-helper.js';
import User from '../../data/user.js';
import CONFIG from '../../global/config.js';

const editPassword = {
  async render() {
    return Templates.editPassword();
  },

  async afterRender(user) {
    if(!user) {
      location.hash = '#/';
      return;
    }

    await TitleHelper.setTitle('Edit Password');

    await this._initPasswordToggler();
    await this._submitEvent();
  },

  async _initPasswordToggler() {
    const inputNewPassword = document.querySelector('#new-password');
    const buttonNewPassword = document.querySelector('#new-password-toggler');
    await PasswordHelper.initTogglerEvent(inputNewPassword, buttonNewPassword);

    const inputCurrentPassword = document.querySelector('#current-password');
    const buttonCurrentPassword = document.querySelector('#current-password-toggler');
    await PasswordHelper.initTogglerEvent(inputCurrentPassword, buttonCurrentPassword);
  },

  async _submitEvent() {
    const form = document.querySelector('#password-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      try {
        const inputData = {
          current_password: event.target['current-password'].value,
          new_password: event.target['new-password'].value,
        };
  
        await this._formValidation(inputData);
        await User.updatePassword(inputData);

        const changeEvent = new CustomEvent('updateUser');
        window.dispatchEvent(changeEvent);

        return await Swal.fire(
          'Successfully updated.',
          'Profile successfully updated.',
          'success'
        );
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error'
        );
      }
    });
  },

  async _formValidation(input) {
    const { PASSWORD_MIN_LENGTH } = CONFIG;

    if(input.new_password.length < PASSWORD_MIN_LENGTH) throw new Error('Your new password is too short.');
  },
};

export default editPassword;
