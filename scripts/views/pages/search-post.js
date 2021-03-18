import Templates from '../templates/templates-creator.js';
import TitleHelper from '../../utils/title-helper.js';
import UrlParser from '../../routes/url-parser.js';
import Post from '../../data/post.js';

const searchPost = {
  async render() {
    return Templates.searchPage();
  },

  async afterRender() {
    let keyword = await UrlParser.parseActiveUrlWithoutCombiner().verb;
    if(!keyword) keyword = '';

    await TitleHelper.setTitle(`Search ${keyword}`);
    await this._setDefaultValue(keyword);
    await this._initNav(keyword);
    await this._renderResult(keyword);
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

  async _renderResult(keyword) {
    try {
      const posts = await Post.searchPost(keyword);
      const container = document.querySelector('#result-container');

      if(posts.length < 1 || keyword === '') {
        container.innerHTML = Templates.searchEmptyResult();
        return;
      }

      container.innerHTML = '';
      posts.forEach(async (post) => {
        container.innerHTML += Templates.searchPostResult(post);
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error'
      );
    }
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
