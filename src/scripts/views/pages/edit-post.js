import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import UrlParser from '../../routes/url-parser';
import TitleHelper from '../../utils/title-helper';
import Post from '../../data/post';
import CONFIG from '../../global/config';
import Colors from '../../data/colors';
import Categories from '../../data/categories';

const editPost = {
  async render() {
    return Templates.editPost();
  },

  async afterRender(user) {
    const postId = await UrlParser.parseActiveUrlWithoutCombiner().verb;
    let post;

    try {
      post = await Post.getPost(postId);
    } catch (error) {
      post = null;
    }

    if (!user || !post) {
      window.location.hash = '#/';
      return;
    }

    await TitleHelper.setTitle(`Edit ${post.title}`);
    await this._initColors();
    await this._initCategories();
    await this._setDefaultValue(post);
    await this._submitEvent(post);
    await this._initDeleteEvent(post);
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

  async _setDefaultValue(post) {
    const title = document.querySelector('input#title');
    title.value = post.title;

    const caption = document.querySelector('textarea#caption');
    caption.value = post.caption;

    const color = document.querySelector(`#colors option[value="${post.color_id}"]`);
    color.setAttribute('selected', '');

    const category = document.querySelector(`#categories option[value="${post.category_id}"]`);
    category.setAttribute('selected', '');
  },

  async _submitEvent(post) {
    const form = document.querySelector('#post-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      try {
        const inputData = {
          post_id: post.id,
          title: event.target.title.value,
          caption: event.target.caption.value,
          color_id: event.target.colors.value,
          category_id: event.target.categories.value,
        };

        await this._formValidation(inputData);
        await Post.updatePost(inputData);

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

    if (input.title.length > MAX_LENGTH.POST.TITLE) throw new Error('Post title is too long.');
  },

  async _initDeleteEvent(post) {
    const button = document.querySelector('#delete-button');
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

        await Post.deletePost(post.id);

        await Swal.fire(
          'Deleted!',
          'Your post has been deleted.',
          'success',
        );

        window.location.hash = '#/';
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
};

export default editPost;
