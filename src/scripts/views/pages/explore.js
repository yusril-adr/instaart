import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import Post from '../../data/post';
import User from '../../data/user';

const explore = {
  async render() {
    return Templates.explorePage();
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
      const postList = await Post.getExplore();

      if (postList.length < 1) {
        const container = document.querySelector('.container#explore .explore-content');
        container.innerHTML = Templates.exploreEmptyList();
        return;
      }

      const listElem = document.querySelector('.post-list');
      listElem.innerHTML = '';
      postList.forEach(async (post) => {
        listElem.innerHTML += Templates.explorePost(post, user.id);
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
          button.ariaLabel = isLiked ? 'dislike this design' : 'like this design';
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

export default explore;
