import Templates from '../templates/templates-creator.js';
import UrlParser from '../../routes/url-parser.js';
import TitleHelper from '../../utils/title-helper.js';
import Post from '../../data/post.js';
import CONFIG from '../../global/config.js';

const editPost = {
  async render() {
    return Templates.editPost();
  },

  async afterRender(user) {
    const postId = await UrlParser.parseActiveUrlWithoutCombiner().verb;
    const post = await Post.getPost(postId);
    if(!user || !post) {
      location.hash = '#/';
      return;
    }

    await TitleHelper.setTitle(`Edit ${post.title}`);
    await this._setDefaultValue(post);
    await this._submitEvent(post);
    await this._initDeleteEvent(post);
  },

  async _setDefaultValue(post) {
    const title = document.querySelector('input#title');
    title.value = post.title;

    const caption = document.querySelector('textarea#caption');
    caption.value = post.caption;
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
        };
  
        await this._formValidation(inputData);
        await Post.updatePost(inputData);

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

    if(input.title.length > MAX_LENGTH.POST.TITLE) throw new Error('Post title is too long.');
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
          confirmButtonText: 'Yes, delete it!'
        });

        if (!isConfirmed) return;

        await Post.deletePost(post.id);

        await Swal.fire(
          'Deleted!',
          'Your post has been deleted.',
          'success'
        );

        location.hash = '#/';
        return;
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error'
        );
      };
    });
  },
};

export default editPost;
