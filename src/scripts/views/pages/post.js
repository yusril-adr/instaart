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

  async afterRender(user) {
    const postId = await UrlParser.parseActiveUrlWithoutCombiner().verb;

    if (!postId) {
      window.location.hash = '#/';
      return;
    }

    await this._renderPost(postId, user);
  },

  async _renderPost(postId, user) {
    let postData;
    try {
      postData = await Post.getPost(postId);
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
    await this._renderPostCommentForm(user);
    await this._renderCommentList(postData);
    if (user) await this._initEditBtn(postData, user);
    return this._initEvent(user, postData);
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
    await this._initLikeEvent(user, postData);
    await this._initCommentFormEvent(user, postData);
  },

  async _initLikeEvent(user, postData) {
    const button = document.querySelector('button.like');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      if (!user) {
        return Swal.fire(
          'Sign in required',
          'Please sign in or sign up first',
          'error',
        );
      }

      try {
        const postId = postData.id;
        const isLiked = button.classList.contains('liked');

        if (isLiked) await User.dislikePost(postId);
        else await User.likePost(postId);

        button.innerHTML = isLiked ? Templates.likedIcon() : Templates.likeIcon();
        button.ariaLabel = isLiked ? 'dislike this design' : 'like this design';
        button.classList.toggle('liked');

        return this.afterRender(user);
      } catch (error) {
        return Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
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
        await this.afterRender(user);
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
