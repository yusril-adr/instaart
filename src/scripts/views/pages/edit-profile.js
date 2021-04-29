import Templates from '../templates/templates-creator.js';
import TitleHelper from '../../utils/title-helper.js';
import User from '../../data/user.js';
import CONFIG from '../../global/config.js';

const editProfile = {
  async render() {
    return Templates.editProfile();
  },

  async afterRender(user) {
    if(!user) {
      location.hash = '#/';
      return;
    }

    await TitleHelper.setTitle('Edit Profile');

    await this._setDefaultValue(user);
    await this._submitEvent();
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
  },

  async _submitEvent() {
    const form = document.querySelector('#profile-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      try {
        const inputData = {
          username: event.target.username.value,
          email: event.target.email.value,
          display_name: event.target["display-name"].value,
          phone_number: event.target["phone-number"].value,
          biodata: event.target.bio.value,
        };
  
        await Swal.showLoading();
        await this._formValidation(inputData);
        await User.update(inputData);

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
    const { MAX_LENGTH } = CONFIG;

    if(input.username.length > MAX_LENGTH.USER.USERNAME) throw new Error('Username is too long.');
    if(input.username.includes(' ')) throw new Error('Username should not contains any space.');

    if(input.email.length > MAX_LENGTH.USER.EMAIL) throw new Error('Email is too long.');

    if(input.display_name.length > MAX_LENGTH.USER.DISPLAY_NAME) throw new Error('Display name is too long.');

    if(!(await this._checkPhoneNumberFormat(input.phone_number))) {
      throw new Error('Phone number format is not valid.');
    }
    if(input.phone_number.length > MAX_LENGTH.USER.PHONE_NUMBER) throw new Error('Phone number is too long.');
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

export default editProfile;
