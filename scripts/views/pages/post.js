import Templates from '../templates/templates-creator.js';
import UrlParser from '../../routes/url-parser.js';
import User from '../../data/user.js';
import Post from '../../data/post.js';
import TitleHelper from '../../utils/title-helper.js';

const post = {
  async render() {
    return Templates.postPage();
  },

  async afterRender(user) {
    const postId = await UrlParser.parseActiveUrlWithoutCombiner().verb;

    if(!postId) {
      location.hash = `#/`;
      return;
    }

    await this._renderPost(postId, user);
  },

  async _renderPost(postId, user) {
    let post;
    try {
      post = await Post.getPost(postId);
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error'
      );
      post = null;
    }
    if(!post) return await this._renderNotFound();

    TitleHelper.setTitle(post.title);
    await this._renderPostDetail(post, user);
    await this._renderPostCommentForm(user);
    await this._renderCommentList(post);
    if(user) await this._initEditBtn(post, user);
    await this._initEvent(user, post);
  },

  async _renderNotFound() {
    const container = document.querySelector('.container#post');
    container.innerHTML = Templates.postNotFound();
  },

  async _renderPostDetail(post, user) {
    const container = document.querySelector('.container#post');
    container.innerHTML = user? Templates.postDetail(post, user.id) : Templates.postDetail(post);
    await this._renderCaption(post);
  },

  async _renderCaption({ caption }) {
    const elems = document.querySelectorAll('.post-caption');
    elems.forEach(async (elem) => {
      elem.innerText = caption;
    });
  },

  async _renderPostCommentForm(user) {
    const container = document.querySelector('#comment-form-container'); 
    if(!user) {
      container.innerHTML = Templates.postCommentLogin();
      return;
    }

    container.innerHTML = Templates.postCommentForm(user);
  },

  async _renderCommentList(post) {
    const { comments } = post;

    const container = document.querySelector('#comments-container');
    if(comments.length < 1) {
      container.innerHTML = Templates.postEmptyComment();
      return;
    }
    
    container.innerHTML = '';
    comments.forEach(async (comment) => container.innerHTML += Templates.postComment(comment));
  },

  async _initEditBtn(post, user) {
    if(post.user_id !== user.id) return;

    const container = document.querySelector('.container#post');
    container.innerHTML += Templates.postEditBtn(post);
  },

  async _initEvent(user, post) {
    await this._initLikeEvent(user, post);
    await this._initCommentFormEvent(user, post);
  },

  async _initLikeEvent(user, post) {
    const button = document.querySelector('button.like');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      if(!user) return await Swal.fire(
        'Sign in required',
        'Please sign in or sign up first',
        'error'
      );

      try {
        const postId = post.id;
        const isLiked = button.classList.contains('liked');

        if(isLiked) await User.dislikePost(postId);
        else await User.likePost(postId);

        button.innerHTML = isLiked? Templates.likedIcon() : Templates.likeIcon();
        button.ariaLabel = isLiked? 'dislike this design': 'like this design';
        button.classList.toggle('liked');

        return await this.afterRender(user);
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error'
        );
      }
    });
  },

  async _initCommentFormEvent(user, post) {
    const form = document.querySelector('form#comment-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      try {
        const inputData = {
          post_id: post.id,
          body: event.target['comment-text'].value,
        };

        await User.commentPost(inputData);
        await this.afterRender(user);
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error'
        );
      }
    });
  },
};

export default post;
