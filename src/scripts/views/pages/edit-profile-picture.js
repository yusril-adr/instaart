import Swal from 'sweetalert2';
import bsCustomFileInput from 'bs-custom-file-input';
import Templates from '../templates/templates-creator';
import TitleHelper from '../../utils/title-helper';
import User from '../../data/user';
import CONFIG from '../../global/config';

const editProfilePicture = {
  async render() {
    return Templates.editProfilePicture();
  },

  async afterRender(user) {
    if (!user) {
      window.location.hash = '#/';
      return;
    }

    // Init Bootstrap File Input Init
    bsCustomFileInput.init();

    await TitleHelper.setTitle('Edit Profile Picture');

    await this._setDefaultValue(user);
    await this._submitEvent();
    await this._deleteEvent();
  },

  async _setDefaultValue(user) {
    const img = document.querySelector('.user-image-element');
    img.src = `${CONFIG.IMAGE_PATH.USER}/${user.image}`;
  },

  async _submitEvent() {
    const form = document.querySelector('#profile-picture-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      try {
        const formData = new FormData();
        formData.append('profile_image', event.target['profile-picture'].files[0]);

        Swal.showLoading();
        await User.updatePicture(formData);

        const changeEvent = new CustomEvent('updateUser');
        window.dispatchEvent(changeEvent);

        await Swal.fire(
          'Successfully updated.',
          'Profile successfully updated.',
          'success',
        );
        return window.location.reload();
      } catch (error) {
        return Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
    });
  },

  async _deleteEvent() {
    const button = document.querySelector('#remove-button');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      try {
        const { isConfirmed } = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        });

        if (!isConfirmed) return;

        await Swal.showLoading();
        await User.removePicture();

        const changeEvent = new CustomEvent('updateUser');
        window.dispatchEvent(changeEvent);

        await Swal.fire(
          'Deleted!',
          'Your profile picture has been deleted.',
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
};

export default editProfilePicture;
