import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import TitleHelper from '../../utils/title-helper';
import UrlParser from '../../routes/url-parser';
import Post from '../../data/post';
import User from '../../data/user';
import Categories from '../../data/categories';
import Colors from '../../data/colors';
import CONFIG from '../../global/config';

const searchPost = {
  async render() {
    return Templates.searchPage();
  },

  async afterRender(user, filteredPost = null, currentTotalPost = null) {
    let keyword = await UrlParser.parseActiveUrlWithoutCombiner().verb;
    if (!keyword) keyword = '';
    else keyword = keyword.split('%20').join(' ');

    keyword = keyword.trim();

    await TitleHelper.setTitle(`Cari ${keyword}`);
    await this._setDefaultValue(keyword);
    await this._initNav(keyword);
    await this._initFilter(user);
    await this._renderResult({
      keyword, user, filteredPost, currentTotalPost,
    });
    await this._initLikeBtn(user, filteredPost, currentTotalPost);
    await this._initSearchForm(keyword);
  },

  async _setDefaultValue(keyword) {
    const inputSearch = document.querySelector('#search-input');
    inputSearch.value = keyword;
  },

  async _initNav(keyword) {
    const navSearch = document.querySelector('#search-nav');
    navSearch.innerHTML = Templates.searchPostNav(keyword);

    const filterElem = document.querySelector('#filter-input');
    filterElem.innerHTML = Templates.searchPostFilter();

    const categories = await Categories.getCategories();
    const colors = await Colors.getColors();

    const categoriesElem = document.querySelector('#categories');
    categoriesElem.innerHTML = Templates.optionWithValue('Semua', 0);
    categories.forEach((category) => {
      categoriesElem.innerHTML += Templates.optionWithValue(category.name, category.id);
    });

    const colorsElem = document.querySelector('#colors');
    colorsElem.innerHTML = Templates.optionWithValue('Semua', 0);
    colors.forEach((color) => {
      colorsElem.innerHTML += Templates.optionWithValue(color.name, color.id);
    });
  },

  async _initFilter(user) {
    const categoriesElem = document.querySelector('#categories');
    categoriesElem.addEventListener('change', await this._filterEvent(user));

    const colorsElem = document.querySelector('#colors');
    colorsElem.addEventListener('change', await this._filterEvent(user));
  },

  async _filterEvent(user) {
    return async (event) => {
      event.stopPropagation();

      const inputSearch = document.querySelector('#search-input');
      const categoriesElem = document.querySelector('#categories');
      const colorsElem = document.querySelector('#colors');

      const keyword = inputSearch.value;
      const category_id = parseInt(categoriesElem.value);
      const color_id = parseInt(colorsElem.value);

      const filteredPost = await Post.searchPost(keyword, {
        category: category_id === 0 ? null : category_id,
        color: color_id === 0 ? null : color_id,
      });

      await this._renderResult({ keyword, user, filteredPost });
    };
  },

  async _renderResult({
    keyword, user, filteredPost, currentTotalPost = null,
  }) {
    try {
      let posts;
      if (filteredPost) posts = filteredPost;
      else posts = await Post.searchPost(keyword);

      const currentTotalPostFormated = currentTotalPost || posts.length;
      const currentTotalRenderPost = currentTotalPostFormated > CONFIG.POST_LIST_DEFAULT_LENGTH
        && currentTotalPost === null ? CONFIG.POST_LIST_DEFAULT_LENGTH : currentTotalPostFormated;

      const container = document.querySelector('#result-container');

      // Render Most Likes Post List
      const category = document.querySelector('#categories').value;
      const color = document.querySelector('#colors').value;
      if (keyword === '' && category === '0' && color === '0') {
        container.innerHTML = '';
        container.innerHTML += Templates.mostLikesPostsTitle();

        const mostLikesPosts = await Post.getMostLikes();

        if (mostLikesPosts.length < 1) {
          container.innerHTML += Templates.mostLikesPostsEmpty();
          return;
        }

        mostLikesPosts.forEach((post) => {
          container.innerHTML += user
            ? Templates.mostLikesPosts(post, user.id) : Templates.mostLikesPosts(post);
        });
        return;
      }

      if (posts.length < 1) {
        container.innerHTML = Templates.searchEmptyResult();
        return;
      }

      container.innerHTML = '';
      posts.forEach(async (post, postIndex) => {
        if (postIndex + 1 > currentTotalRenderPost) return;

        container.innerHTML += user
          ? Templates.searchPostResult(post, user.id) : Templates.searchPostResult(post);
      });

      await this._initLoadMoreBtn({
        user,
        currentTotalRenderPost,
        filteredPost,
        posts,
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );

      const container = document.querySelector('#result-container');
      container.innerHTML = Templates.searchEmptyResult();
    }
  },

  async _initLoadMoreBtn({
    user,
    currentTotalRenderPost,
    filteredPost,
    posts,
  }) {
    const btnContainer = document.querySelector('#load-btn');

    if (currentTotalRenderPost === posts.length || posts.length === 0) {
      btnContainer.innerHTML = '';
      return;
    }

    btnContainer.innerHTML = Templates.loadMoreBtn();

    const loadBtn = document.querySelector('#load-btn button');
    loadBtn.addEventListener('click', async (event) => {
      event.stopPropagation();

      const postDifference = posts.length - currentTotalRenderPost;
      const afterTotalRenderPost = postDifference < CONFIG.POST_LIST_DEFAULT_LENGTH
        ? currentTotalRenderPost + postDifference
        : currentTotalRenderPost + CONFIG.POST_LIST_DEFAULT_LENGTH;
      await this.afterRender(user, filteredPost, afterTotalRenderPost);
    });
  },

  async _initLikeBtn(user, filteredPost, currentTotalPost) {
    const buttons = document.querySelectorAll('button.like');
    buttons.forEach(async (button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();

        if (!user) {
          return Swal.fire(
            'Akun diperlukan',
            'Silakan masuk atau daftar sebagai akun baru',
            'error',
          );
        }

        try {
          const postId = button.getAttribute('post-id');
          const isLiked = button.classList.contains('liked');

          if (isLiked) await User.dislikePost(postId);
          else await User.likePost(postId);

          button.innerHTML = isLiked ? Templates.likedIcon() : Templates.likeIcon();
          button.ariaLabel = isLiked ? 'dislike this design' : 'like this design';
          button.classList.toggle('liked');

          return this.afterRender(user, filteredPost, currentTotalPost);
        } catch (error) {
          await Swal.fire(
            'Oops ...',
            error.message,
            'error',
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

      window.location.hash = `#/search-post/${event.target['search-input'].value.trim() || ''}`;
    });
  },
};

export default searchPost;
