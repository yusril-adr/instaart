import Swal from 'sweetalert2';
import bsCustomFileInput from 'bs-custom-file-input';
import Templates from '../templates/templates-creator';
import TitleHelper from '../../utils/title-helper';
import Post from '../../data/post';
import CONFIG from '../../global/config';
import Colors from '../../data/colors';
import Categories from '../../data/categories';

const newPost = {
  async render() {
    return Templates.newPost();
  },

  async afterRender(user) {
    if (!user) {
      window.location.hash = '#/';
      return;
    }

    // Init Bootstrap File Input Init
    bsCustomFileInput.init();

    await TitleHelper.setTitle('Portofolio Baru');

    await this._initColors();
    await this._initCategories();

    await this._onChangeEvent();
    await this._initSubmitEvent();
  },

  async _initColors() {
    try {
      const colorsElem = document.querySelector('#colors');

      const colors = await Colors.getColors();

      colorsElem.innerHTML = colors.map(({ id, name }) => Templates.optionWithValue(name, id));
    } catch (error) {
      const warn = await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );

      if (warn.isConfirmed) window.location.href = '#/';
    }
  },

  async _initCategories() {
    try {
      const categoriesElem = document.querySelector('#categories');

      const categories = await Categories.getCategories();

      categoriesElem.innerHTML = categories.map(({ id, name }) => (
        Templates.optionWithValue(name, id)
      ));
    } catch (error) {
      const warn = await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );

      if (warn.isConfirmed) window.location.href = '#/';
    }
  },

  async _onChangeEvent() {
    const postImageInputOne = document.querySelector('#post-image-1');
    postImageInputOne.addEventListener('change', () => {
      const preview = document.querySelector('#preview-image-1 img');
      const file = document.querySelector('#post-image-1').files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        // convert image file to base64 string
        preview.src = reader.result;

        const previewImageContainer = document.querySelector('#preview-image-1');
        if (previewImageContainer.classList.contains('d-none')) {
          previewImageContainer.classList.remove('d-none');
        }
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    });

    const postImageInputTwo = document.querySelector('#post-image-2');
    postImageInputTwo.addEventListener('change', () => {
      const preview = document.querySelector('#preview-image-2 img');
      const file = document.querySelector('#post-image-2').files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        // convert image file to base64 string
        preview.src = reader.result;

        const previewImageContainer = document.querySelector('#preview-image-2');
        if (previewImageContainer.classList.contains('d-none')) {
          previewImageContainer.classList.remove('d-none');
        }
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    });

    const postImageInputThree = document.querySelector('#post-image-3');
    postImageInputThree.addEventListener('change', () => {
      const preview = document.querySelector('#preview-image-3 img');
      const file = document.querySelector('#post-image-3').files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        // convert image file to base64 string
        preview.src = reader.result;

        const previewImageContainer = document.querySelector('#preview-image-3');
        if (previewImageContainer.classList.contains('d-none')) {
          previewImageContainer.classList.remove('d-none');
        }
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  },

  async _initSubmitEvent() {
    const form = document.querySelector('#post-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      try {
        const inputData = {
          title: event.target.title.value,
          caption: event.target.caption.value,
          color_id: event.target.colors.value,
          category_id: event.target.categories.value,
        };

        await this._formValidation(inputData);

        const formImages = [];

        const formImgOne = new FormData();
        formImgOne.append('image', event.target['post-image-1'].files[0]);

        formImages.push(formImgOne);

        if (event.target['post-image-2'].files[0]) {
          const formImgTwo = new FormData();
          formImgTwo.append('image', event.target['post-image-2'].files[0]);
          formImages.push(formImgTwo);
        }

        if (event.target['post-image-3'].files[0]) {
          const formImgThree = new FormData();
          formImgThree.append('image', event.target['post-image-3'].files[0]);
          formImages.push(formImgThree);
        }

        Swal.showLoading();

        const post = await Post.newPost(inputData, formImages);

        await Swal.fire(
          'Berhasil !',
          'Desain berhasil diunggah.',
          'success',
        );
        window.location.hash = `#/post/${post.id}`;
        return;
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
    });
  },

  async _formValidation(input) {
    const { MAX_LENGTH } = CONFIG;
    if (input.title.length > MAX_LENGTH.POST.TITLE) throw new Error('Post Title is too long.');
  },
};

export default newPost;
