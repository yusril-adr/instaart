import Templates from '../templates/templates-creator.js';
import TitleHelper from '../../utils/title-helper.js';
import PasswordHelper from '../../utils/password-helper.js';
import User from '../../data/user.js';
import CONFIG from '../../global/config.js';

const signUp = {
  async render() {
    return Templates.signUpPage();
  },

  async afterRender(user) {
    if(user) {
      location.hash = '#/explore/';
      return;
    }

    await TitleHelper.setTitle('Sign up');
    await this._initPasswordToggler();
    await this._formSubmitEvent();
  },

  async _initPasswordToggler() {
    const inputPassword = document.querySelector('#password');
    const buttonPassword = document.querySelector('#password-toggler');
    await PasswordHelper.initTogglerEvent(inputPassword, buttonPassword);

    const inputConfirmPassword = document.querySelector('#confirm-password');
    const buttonConfirmPassword = document.querySelector('#confirm-password-toggler');
    await PasswordHelper.initTogglerEvent(inputConfirmPassword, buttonConfirmPassword);
  },

  async _formSubmitEvent() {
    const form = document.querySelector('#signup-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      try {
        const inputData = {
          username: event.target.username.value,
          password : event.target.password.value,
          email: event.target.email.value,
          display_name: event.target["display-name"].value,
          phone_number: event.target["phone-number"].value,
          biodata: event.target.biodata.value,
        };

        const confirmPassword = event.target['confirm-password'].value;
        await this._formValidation(inputData, confirmPassword);

        await User.signUp(inputData);

        const changeEvent = new CustomEvent('signInOrOut');
        window.dispatchEvent(changeEvent);

        location.hash = '#/explore/';
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error'
        );
      }
    });
  },

  async _formValidation(input, confirmPassword) {
    const { PASSWORD_MIN_LENGTH, MAX_LENGTH } = CONFIG;

    if(input.username.length > MAX_LENGTH.USER.USERNAME) throw new Error('Username is too long.');
    if(input.username.includes(' ')) throw new Error('Username should not contains any space.');

    if(input.email.length > MAX_LENGTH.USER.EMAIL) throw new Error('Email is too long.');

    if(input.password.length < PASSWORD_MIN_LENGTH) throw new Error('Password is too short.');
    if(!(await PasswordHelper.confirmPassword(input.password, confirmPassword))) {
      throw new Error('Password didn\'t match.');
    }

    if(input.display_name.length > MAX_LENGTH.USER.DISPLAY_NAME) throw new Error('Display name is too long.');

    if(!parseInt(input.phone_number)) throw new Error('Phone number format is not valid.');
    if(input.phone_number.length > MAX_LENGTH.USER.PHONE_NUMBER) throw new Error('Phone number is too long.');
  },
};

export default signUp;
