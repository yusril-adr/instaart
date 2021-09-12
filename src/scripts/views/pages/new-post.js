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

    await TitleHelper.setTitle('New Post');

    await this._initColors();
    await this._initCategories();

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

        const formImg = new FormData();
        formImg.append('image', event.target['post-image'].files[0]);

        Swal.showLoading();

        const post = await Post.newPost(inputData, formImg);

        await Swal.fire(
          'Successfully created.',
          'Post successfully created.',
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
