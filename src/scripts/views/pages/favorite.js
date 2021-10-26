import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import Post from '../../data/post';
import User from '../../data/user';
import TitleHelper from '../../utils/title-helper';
import CONFIG from '../../global/config';

const favorite = {
  async render() {
    return Templates.favoritePage();
  },

  async afterRender(user, currentTotalPost = null) {
    if (!user) {
      window.location.hash = '#/';
      return;
    }

    await TitleHelper.setTitle('Disukai');
    await this._renderList(user, currentTotalPost);
  },

  async _renderList(user, currentTotalPost) {
    try {
      const postList = await Post.getFavorites();

      const currentTotalPostFormated = currentTotalPost || postList.length;
      const currentTotalRenderPost = currentTotalPostFormated > CONFIG.POST_LIST_DEFAULT_LENGTH
        && currentTotalPost === null ? CONFIG.POST_LIST_DEFAULT_LENGTH : currentTotalPostFormated;

      if (postList.length < 1) {
        const container = document.querySelector('.container#favorite .favorite-content');
        container.innerHTML = Templates.emptyFavoritePage();
        return;
      }

      const listElem = document.querySelector('.post-list');
      listElem.innerHTML = '';
      postList.forEach(async (post, postIndex) => {
        if (postIndex + 1 > currentTotalRenderPost) return;

        listElem.innerHTML += Templates.favoritePost(post, user.id);
      });

      await this._initLikeBtn(user);
      await this._initLoadMoreBtn({
        user,
        currentTotalRenderPost,
        postList,
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },

  async _initLikeBtn(user) {
    const buttons = document.querySelectorAll('button.like');
    buttons.forEach(async (button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();

        if (!user) {
          await Swal.fire(
            'Akun diperlukan',
            'Silakan masuk atau daftar sebagai akun baru',
            'error',
          );
          return;
        }

        try {
          const postId = button.getAttribute('post-id');
          const isLiked = button.classList.contains('liked');

          if (isLiked) await User.dislikePost(postId);
          else await User.likePost(postId);

          button.innerHTML = isLiked ? Templates.likedIcon() : Templates.likeIcon();
          button.ariaLabel = isLiked ? 'batal sukai desain ini' : 'sukai desaian ini';
          button.classList.toggle('liked');

          this.afterRender(user);
          return;
        } catch (error) {
          await Swal.fire(
            'Oops ...',
            error.message,
            'error',
          );
          return;
        }
      });
    });
  },

  async _initLoadMoreBtn({
    user,
    currentTotalRenderPost,
    postList,
  }) {
    const btnContainer = document.querySelector('#load-btn');

    if (currentTotalRenderPost === postList.length || postList.length === 0) {
      btnContainer.innerHTML = '';
      return;
    }

    btnContainer.innerHTML = Templates.loadMoreBtn();

    const loadBtn = document.querySelector('#load-btn button');
    loadBtn.addEventListener('click', async (event) => {
      event.stopPropagation();

      const postDifference = postList.length - currentTotalRenderPost;
      const afterTotalRenderPost = postDifference < CONFIG.POST_LIST_DEFAULT_LENGTH
        ? currentTotalRenderPost + postDifference
        : currentTotalRenderPost + CONFIG.POST_LIST_DEFAULT_LENGTH;
      await this.afterRender(user, afterTotalRenderPost);
    });
  },
};

export default favorite;
