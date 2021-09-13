import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import Post from '../../data/post';
import User from '../../data/user';

const favorite = {
  async render() {
    return Templates.favoritePage();
  },

  async afterRender(user) {
    if (!user) {
      window.location.hash = '#/';
      return;
    }

    await this._renderList(user);
  },

  async _renderList(user) {
    try {
      const postList = await Post.getFavorites();

      if (postList.length < 1) {
        const container = document.querySelector('.container#favorite .favorite-content');
        container.innerHTML = Templates.emptyFavoritePage();
        return;
      }

      const listElem = document.querySelector('.post-list');
      listElem.innerHTML = '';
      postList.forEach(async (post) => {
        listElem.innerHTML += Templates.favoritePost(post, user.id);
      });

      await this._initLikeBtn(user);
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
};

export default favorite;
