import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import UrlParser from '../../routes/url-parser';
import User from '../../data/user';
import Post from '../../data/post';
import TitleHelper from '../../utils/title-helper';

const post = {
  async render() {
    return Templates.postPage();
  },

  async afterRender(user, { withInsight = true } = {}) {
    const postId = await UrlParser.parseActiveUrlWithoutCombiner().verb;

    if (!postId) {
      window.location.hash = '#/';
      return;
    }

    await this._renderPost(postId, user, withInsight);
  },

  async _renderPost(postId, user, withInsight) {
    let postData;
    try {
      postData = await Post.getPost(postId, { insight: withInsight });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
      postData = null;
    }
    if (!postData) return this._renderNotFound();

    TitleHelper.setTitle(postData.title);
    await this._renderPostDetail(postData, user);
    await this._renderBookmarkButton(postData, user);
    await this._renderPostCommentForm(user);
    await this._renderCommentList(postData);
    if (user) {
      await this._initEditBtn(postData, user);
    }
    await this._initEvent(user, postData);
  },

  async _renderNotFound() {
    const container = document.querySelector('.container#post');
    container.innerHTML = Templates.postNotFound();
  },

  async _renderPostDetail(postData, user) {
    const container = document.querySelector('.container#post');
    container.innerHTML = user
      ? Templates.postDetail(postData, user.id) : Templates.postDetail(postData);
    await this._renderCaption(postData);
  },

  async _renderCaption({ caption }) {
    const elems = document.querySelectorAll('.post-caption');
    elems.forEach(async (elem) => {
      elem.innerText = caption;
    });
  },

  async _renderBookmarkButton(postData, user) {
    const button = document.querySelector('button#bookmark');

    const bookmarkPosts = user ? await Post.getBookmarkPosts() : [];

    const isBookmarked = bookmarkPosts ? bookmarkPosts.find((boomarkPost) => (
      boomarkPost.id === postData.id
    )) : null;

    if (isBookmarked) button.classList.add('bookmarked');
    else if (button.classList.contains('bookmarked')) button.classList.remove('bookmarked');

    button.innerHTML = isBookmarked ? Templates.bookmarkedIcon() : Templates.bookmarkIcon();
  },

  async _renderPostCommentForm(user) {
    const container = document.querySelector('#comment-form-container');
    if (!user) {
      container.innerHTML = Templates.postCommentLogin();
      return;
    }

    container.innerHTML = Templates.postCommentForm(user);
  },

  async _renderCommentList({ comments }) {
    const container = document.querySelector('#comments-container');
    if (comments.length < 1) {
      container.innerHTML = Templates.postEmptyComment();
      return;
    }

    container.innerHTML = '';
    comments.forEach(async (comment) => {
      container.innerHTML += Templates.postComment(comment);
    });
  },

  async _initEditBtn(postData, user) {
    if (postData.user_id !== user.id) return;

    const container = document.querySelector('.container#post');
    container.innerHTML += Templates.postEditBtn(postData);
  },

  async _initEvent(user, postData) {
    await this._initBookmarkEvent(user, postData);
    await this._initLikeEvent(user, postData);
    await this._initShareEvent(postData);
    await this._initCommentFormEvent(user, postData);
  },

  async _initBookmarkEvent(user, postData) {
    const button = document.querySelector('button#bookmark');
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
        const postId = postData.id;
        const isBookmarked = button.classList.contains('bookmarked');

        Swal.showLoading();

        if (isBookmarked) await User.unBookmarkPost(postId);
        else await User.bookmarkPost(postId);

        button.innerHTML = isBookmarked ? Templates.bookmarkedIcon() : Templates.bookmarkIcon();
        button.ariaLabel = isBookmarked ? 'hapus desain ini dari penyimpanan' : 'simpan desain ini';
        button.classList.toggle('bookmarked');

        Swal.fire(
          'Berhasil',
          isBookmarked ? 'Desain dihapus dari daftar penyimpanan' : 'Desain berhasil disimpan.',
          'success',
        );

        return this.afterRender(user, { withInsight: false });
      } catch (error) {
        return Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
    });
  },

  async _initLikeEvent(user, postData) {
    const button = document.querySelector('button.like');
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
        const postId = postData.id;
        const isLiked = button.classList.contains('liked');

        if (isLiked) await User.dislikePost(postId);
        else await User.likePost(postId);

        button.innerHTML = isLiked ? Templates.likedIcon() : Templates.likeIcon();
        button.ariaLabel = isLiked ? 'batal sukai desain ini' : 'sukai desain ini';
        button.classList.toggle('liked');

        return this.afterRender(user, { withInsight: false });
      } catch (error) {
        return Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
    });
  },

  async _initShareEvent() {
    const button = document.querySelector('#share-btn');

    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      navigator.clipboard.writeText(window.location.href);

      await Swal.fire({
        icon: 'success',
        title: 'Tautan berhasil disalin dan siap untuk dibagikan',
      });
    });
  },

  async _initCommentFormEvent(user, postData) {
    const form = document.querySelector('form#comment-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      try {
        const inputData = {
          post_id: postData.id,
          body: event.target['comment-text'].value,
        };

        await User.commentPost(inputData);
        await this.afterRender(user, { withInsight: false });
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
    });
  },
};

export default post;
