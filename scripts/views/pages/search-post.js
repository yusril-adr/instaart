import Templates from '../templates/templates-creator.js';
import TitleHelper from '../../utils/title-helper.js';
import UrlParser from '../../routes/url-parser.js';
import Post from '../../data/post.js';
import User from '../../data/user.js';

const searchPost = {
  async render() {
    return Templates.searchPage();
  },

  async afterRender(user) {
    let keyword = await UrlParser.parseActiveUrlWithoutCombiner().verb;
    if(!keyword) keyword = '';

    await TitleHelper.setTitle(`Search ${keyword}`);
    await this._setDefaultValue(keyword);
    await this._initNav(keyword);
    await this._renderResult(keyword, user);
    await this._initLikeBtn(user);
    await this._initSearchForm(keyword);
  },

  async _setDefaultValue(keyword) {
    const inputSearch = document.querySelector('#search-input');
    inputSearch.value = keyword;
  },

  async _initNav(keyword) {
    const navSearch = document.querySelector('#search-nav');
    navSearch.innerHTML = Templates.searchPostNav(keyword);
  },

  async _renderResult(keyword, user) {
    try {
      const posts = await Post.searchPost(keyword);
      const container = document.querySelector('#result-container');

      if(posts.length < 1 || keyword === '') {
        container.innerHTML = Templates.searchEmptyResult();
        return;
      }

      container.innerHTML = '';
      posts.forEach(async (post) => {
        container.innerHTML += user? Templates.searchPostResult(post, user.id) : Templates.searchPostResult(post);
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error'
      );
    }
  },

  async _initLikeBtn(user) {
    const buttons = document.querySelectorAll('button.like');
    buttons.forEach(async (button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();

        if(!user) return await Swal.fire(
          'Sign in required',
          'Please sign in or sign up first',
          'error'
        );

        try {
          const postId = button.getAttribute('post-id');
          const isLiked = button.classList.contains('liked');

          if(isLiked) await User.dislikePost(postId);
          else await User.likePost(postId);

          button.innerHTML = isLiked? Templates.likedIcon() : Templates.likeIcon();
          button.ariaLabel = isLiked? 'dislike this design': 'like this design';
          button.classList.toggle('liked');

          return this.afterRender(user);
        } catch (error) {
          console.log(error);
          await Swal.fire(
            'Oops ...',
            error.message,
            'error'
          );
        }
      });
    });
  },

  async _initSearchForm() {
    const form = document.querySelector('#search-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      location.hash = `#/search-post/${event.target['search-input'].value || ''}`;
    });
  },
};

export default searchPost;
