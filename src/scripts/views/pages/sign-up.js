import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import TitleHelper from '../../utils/title-helper';
import PasswordHelper from '../../utils/password-helper';
import User from '../../data/user';
import CONFIG from '../../global/config';
import InputLocationHelper from '../../utils/input-location-helper';

const signUp = {
  async render() {
    return Templates.signUpPage();
  },

  async afterRender(user) {
    if (user) {
      window.location.hash = '#/explore/';
      return;
    }

    await TitleHelper.setTitle('Daftar');
    await this._initPasswordToggler();
    await this._initInputLocation();
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

  async _initInputLocation() {
    const provinceElem = document.querySelector('#province');
    const cityElem = document.querySelector('#city');

    await InputLocationHelper.init(provinceElem, cityElem);
  },

  async _formSubmitEvent() {
    const form = document.querySelector('#signup-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      const province_id = event.target.province.value;
      const city_id = event.target.city.value;

      try {
        const inputData = {
          username: event.target.username.value,
          password: event.target.password.value,
          email: event.target.email.value,
          display_name: event.target['display-name'].value,
          phone_number: event.target['phone-number'].value,
          biodata: event.target.biodata.value,
          province_id,
          city_id,
          province_name: document.querySelector(`#province option[value="${province_id}"]`).innerHTML,
          city_name: document.querySelector(`#city option[value="${city_id}"]`).innerHTML,
        };

        const confirmPassword = event.target['confirm-password'].value;
        await this._formValidation(inputData, confirmPassword);

        await User.signUp(inputData);

        const changeEvent = new CustomEvent('updateUser');
        return window.dispatchEvent(changeEvent);
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
    });
  },

  async _formValidation(input, confirmPassword) {
    const { PASSWORD_MIN_LENGTH, MAX_LENGTH } = CONFIG;

    if (input.username.length > MAX_LENGTH.USER.USERNAME) throw new Error('Username terlalu panjang.');
    if (input.username.includes(' ')) throw new Error('Username tidak boleh mengandung spasi.');
    const specialChars = ['&', '>', '<', '"'];
    specialChars.forEach((specialChar) => {
      if (input.username.includes(specialChar)) throw new Error('Username tidak boleh mengandung \'&\', \'>\' , \'<\', \'"\'');
    });

    if (input.email.length > MAX_LENGTH.USER.EMAIL) throw new Error('Email terlalu panjang.');

    if (input.password.length < PASSWORD_MIN_LENGTH) throw new Error('Password terlalu pendek.');
    if (!(await PasswordHelper.confirmPassword(input.password, confirmPassword))) {
      throw new Error('Password tidak cocok.');
    }

    if (input.display_name.length > MAX_LENGTH.USER.DISPLAY_NAME) throw new Error('Nama lengkap terlalu panjang.');

    if (!(await this._checkPhoneNumberFormat(input.phone_number))) {
      throw new Error('Nomor telepon tidak valid.');
    }
    if (input.phone_number.length > MAX_LENGTH.USER.PHONE_NUMBER) throw new Error('Nomor telepon terlalu panjang.');
  },

  async _checkPhoneNumberFormat(phoneNumberInput) {
    const tenDigit = /^\(?([0-9]{10})\)?$/;
    const twelveDigit = /^\(?([0-9]{12})\)?$/;

    if (phoneNumberInput.match(tenDigit) || phoneNumberInput.match(twelveDigit)) {
      return true;
    }

    return false;
  },
};

export default signUp;
