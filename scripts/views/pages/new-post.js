import Templates from '../templates/templates-creator.js';
import TitleHelper from '../../utils/title-helper.js';
import Post from '../../data/post.js';
import CONFIG from '../../global/config.js';

const newPost = {
  async render() {
    return Templates.newPost();
  },

  async afterRender(user) {
    if(!user) {
      location.hash = '#/';
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
        const post = await Post.newPost(inputData, formImg);

        location.hash = `#/post/${post.id}`;
        return;
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
    if(input.title.length > MAX_LENGTH.POST.TITLE) throw new Error('Post Title is too long.');
  },
};

export default newPost;
