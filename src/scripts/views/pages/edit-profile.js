import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import TitleHelper from '../../utils/title-helper';
import InputLocationHelper from '../../utils/input-location-helper';
import User from '../../data/user';
import CONFIG from '../../global/config';

const editProfile = {
  async render() {
    return Templates.editProfile();
  },

  async afterRender(user) {
    if (!user) {
      window.location.hash = '#/';
      return;
    }

    await TitleHelper.setTitle('Edit Profil');

    await this._setDefaultValue(user);
    await this._submitEvent();
    await this._initSignOutBtn();
  },

  async _setDefaultValue(user) {
    const username = document.querySelector('input#username');
    username.value = user.username;

    const displayName = document.querySelector('input#display-name');
    displayName.value = user.display_name;

    const email = document.querySelector('input#email');
    email.value = user.email;

    const phoneNumber = document.querySelector('input#phone-number');
    phoneNumber.value = user.phone_number;

    const bio = document.querySelector('textarea#bio');
    bio.value = user.biodata;

    await this._initInputLocation(user);
  },

  async _initInputLocation(user) {
    const provinceElem = document.querySelector('#province');
    const cityElem = document.querySelector('#city');

    await InputLocationHelper.init(provinceElem, cityElem, {
      defaultProvince: user.province_id,
      defaultCity: user.city_id,
    });
  },

  async _submitEvent() {
    const form = document.querySelector('#profile-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      const province_id = event.target.province.value;
      const city_id = event.target.city.value;

      try {
        const inputData = {
          username: event.target.username.value,
          email: event.target.email.value,
          display_name: event.target['display-name'].value,
          phone_number: event.target['phone-number'].value,
          province_id,
          city_id,
          province_name: document.querySelector(`#province option[value="${province_id}"]`).innerHTML,
          city_name: document.querySelector(`#city option[value="${city_id}"]`).innerHTML,
          biodata: event.target.bio.value,
        };

        await Swal.showLoading();
        await this._formValidation(inputData);
        await User.update(inputData);

        const changeEvent = new CustomEvent('updateUser');
        window.dispatchEvent(changeEvent);

        await Swal.fire(
          'Berhasil Dirubah.',
          'Profil kamu telah dirubah.',
          'success',
        );
        return;
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

  async _formValidation(input) {
    const { MAX_LENGTH } = CONFIG;

    if (input.username.length > MAX_LENGTH.USER.USERNAME) throw new Error('Username is too long.');
    if (input.username.includes(' ')) throw new Error('Username should not contains any space.');

    if (input.email.length > MAX_LENGTH.USER.EMAIL) throw new Error('Email is too long.');

    if (input.display_name.length > MAX_LENGTH.USER.DISPLAY_NAME) throw new Error('Display name is too long.');

    if (!(await this._checkPhoneNumberFormat(input.phone_number))) {
      throw new Error('Phone number format is not valid.');
    }
    if (input.phone_number.length > MAX_LENGTH.USER.PHONE_NUMBER) throw new Error('Phone number is too long.');
  },

  async _checkPhoneNumberFormat(phoneNumberInput) {
    const tenDigit = /^\(?([0-9]{10})\)?$/;
    const twelveDigit = /^\(?([0-9]{12})\)?$/;

    if (phoneNumberInput.match(tenDigit) || phoneNumberInput.match(twelveDigit)) {
      return true;
    }

    return false;
  },

  async _initSignOutBtn() {
    const button = document.querySelector('#sign-out-btn');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      try {
        const { isConfirmed } = await Swal.fire({
          title: 'Apakah anda yakin?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya!',
          cancelButtonText: 'Tidak',
        });

        if (!isConfirmed) return;

        await User.signOut();

        const changeEvent = new CustomEvent('updateUser');
        window.dispatchEvent(changeEvent);
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

export default editProfile;
