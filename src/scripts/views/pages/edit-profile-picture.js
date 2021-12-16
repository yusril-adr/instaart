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

    await TitleHelper.setTitle('Edit Foto Profil');

    await this._setDefaultValue(user);
    await this._onChangeEvent();
    await this._submitEvent();
    await this._deleteEvent();
  },

  async _setDefaultValue(user) {
    const img = document.querySelector('.user-image-element');
    img.src = `${CONFIG.IMAGE_PATH.USER}/${user.image}`;
  },

  async _onChangeEvent() {
    const imageInput = document.querySelector('#profile-picture');
    imageInput.addEventListener('change', () => {
      const preview = document.querySelector('img.user-image-element');
      const file = document.querySelector('#profile-picture').files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        // convert image file to base64 string
        preview.src = reader.result;
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    });
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
          'Berhasil Dirubah.',
          'Profil kamu telah dirubah.',
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
          title: 'Apakah anda yakin?',
          text: 'Foto profil anda tidak akan dapat dikembalikan lagi.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, hapus foto!',
          cancelButtonText: 'Batal',
        });

        if (!isConfirmed) return;

        await Swal.showLoading();
        await User.removePicture();

        const changeEvent = new CustomEvent('updateUser');
        window.dispatchEvent(changeEvent);

        await Swal.fire(
          'Terhapus!',
          'Foto profil anda telah dihapus.',
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
