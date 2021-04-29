import Swal from 'sweetalert2';
import bsCustomFileInput from 'bs-custom-file-input';
import Templates from '../templates/templates-creator';
import TitleHelper from '../../utils/title-helper';
import Post from '../../data/post';
import CONFIG from '../../global/config';

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
    await this._initSubmitEvent();
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
