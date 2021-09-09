import Swal from 'sweetalert2';
import $ from 'jquery';
import bsCustomFileInput from 'bs-custom-file-input';
import Templates from '../templates/templates-creator';
import TitleHelper from '../../utils/title-helper';
import Post from '../../data/post';
import CONFIG from '../../global/config';
import API_ENDPOINT from '../../global/api-endpoint';

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

    await this._initCollaborator();

    await this._initSubmitEvent();
  },

  async _initCollaborator() {
    const formatRepo = (user) => {
      if (user.loading) {
        return user.username;
      }

      const $container = $(`
      <div class="w-100">
        <img class="w-100" src="/images/users/${user.image}">
        <span>${user.username}</span>
      </div>
    `);

      return $container;
    };

    const formatRepoSelection = (user) => user.username || user.display_name;

    $('#user-collaborator').select2({
      ajax: {
        url: API_ENDPOINT.SEARCH,
        dataType: 'json',
        delay: 250,
        multiple: true,
        data(params) {
          return {
            keyword: params.term, // search term
            page: params.page,
          };
        },
        processResults(data, params) {
          // parse the results into the format expected by Select2
          // since we are using custom formatting functions we do not need to
          // alter the remote JSON data, except to indicate that infinite
          // scrolling can be used
          params.page = params.page || 1;
          return {
            results: data.user,
            pagination: {
              more: (params.page * 30) < data.total_count,
            },
          };
        },
        cache: true,
      },
      minimumInputLength: 1,
      placeholder: 'Collaborator username',
      templateResult: formatRepo,
      templateSelection: formatRepoSelection,
    });
  },

  async _initSubmitEvent() {
    const form = document.querySelector('#post-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      // const collaborators = $('#user-collaborator').select2('data');

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
