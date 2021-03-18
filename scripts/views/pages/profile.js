import Templates from '../templates/templates-creator.js';
import UrlParser from '../../routes/url-parser.js';
import User from '../../data/user.js';
import TitleHelper from '../../utils/title-helper.js';
import CONFIG from '../../global/config.js';

const profile = {
  async render() {
    return Templates.profilePage();
  },

  async afterRender(user) {
    const targetedUsername = await UrlParser.parseActiveUrlWithoutCombiner().verb;

    if(!targetedUsername && user) {
      location.hash = `#/profile/${user.username}/`;
      return;
    }

    if(!targetedUsername && !user) {
      location.hash = '#/';
      return;
    }

    if(user) await this._newPostBtn(targetedUsername, user.username);
    await this._renderProfile(targetedUsername, user);
  },

  async _newPostBtn(targetUsername, currentUsername) {
    if(targetUsername !== currentUsername) return;

    const container = document.querySelector('.container#profile');
    container.innerHTML += Templates.profileNewPost();
  }, 

  async _renderProfile(targetedUsername, currentUser) {
    const targetedUser = await User.getUserByUsername(targetedUsername);
    if (!targetedUser) return await this._renderNotFound();

    TitleHelper.setTitle(targetedUser.display_name);

    await this._renderProfileImage(targetedUser);
    await this._renderDisplayName(targetedUser);
    await this._renderUsername(targetedUser);
    await this._renderUserBtn(targetedUser, currentUser);
    await this._renderBio(targetedUser);
    await this._renderFollowers(targetedUser);
    await this._renderFollowing(targetedUser);
    await this._renderEmail(targetedUser);
    await this._renderPhoneNumber(targetedUser);
    await this._renderPostList(targetedUser, currentUser);
  },

  async _renderNotFound() {
    const container = document.querySelector('.container#profile');
    container.innerHTML = Templates.profileNotFound();
  },

  async _renderProfileImage({ image }) {
    const elems = document.querySelectorAll('.user-image-element');
    elems.forEach(async (elem) => {
      elem.src = `${CONFIG.IMAGE_PATH.USER}/${image}`;
    });
  },

  async _renderDisplayName({ display_name }) {
    const elems = document.querySelectorAll('.user-display-name');
    elems.forEach(async (elem) => {
      elem.innerText = display_name;
    });
  },

  async _renderUsername({ username }) {
    const elems = document.querySelectorAll('.user-username');
    elems.forEach(async (elem) => {
      elem.innerText = username;
    });
  },

  async _renderUserBtn(targetedUser, currentUser) {
    if(!currentUser) return this._renderFollowBtnWithAlert();

    if(currentUser.id === targetedUser.id) return await this._renderEditBtn();

    if(targetedUser.followers.includes(currentUser.id)) {
      return this._renderUnfollowBtn(targetedUser, currentUser);
    }

    return this._renderFollowBtn(targetedUser, currentUser);
  },

  async _renderFollowBtnWithAlert() {
    const container = document.querySelector('#user-button-container');
    container.innerHTML = Templates.profileFollowBtn();

    await this._initSigninAlert();
  },

  async _initSigninAlert() {
    const btn = document.querySelector('#follow');
    btn.addEventListener('click', async (event) => {
      event.stopPropagation();

      await Swal.fire(
        'Sign in required',
        'Please sign in or sign up first',
        'error'
      );
    });
  },

  async _renderEditBtn() {
    const container = document.querySelector('#user-button-container');
    container.innerHTML = Templates.profileEditBtn();
  },

  async _renderUnfollowBtn(targetedUser, currentUser) {
    const container = document.querySelector('#user-button-container');
    container.innerHTML = Templates.profileUnfollowBtn();

    await this._initUnfollowEvent(targetedUser, currentUser);
  },

  async _initUnfollowEvent(targetedUser, currentUser) {
    const button = document.querySelector('#unfollow');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      try {
        await User.unFollowUser(targetedUser.id);
        return await this._renderProfile(targetedUser.username, currentUser);
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error'
        );
      }
    });
  },

  async _renderFollowBtn(targetedUser, currentUser) {
    const container = document.querySelector('#user-button-container');
    container.innerHTML = Templates.profileFollowBtn();

    await this._initFollowEvent(targetedUser, currentUser);
  },

  async _initFollowEvent(targetedUser, currentUser) {
    const button = document.querySelector('#follow');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      try {
        await User.followUser(targetedUser.id);
        return await this._renderProfile(targetedUser.username, currentUser);
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error'
        );
      }
    });
  },

  async _renderBio({ biodata }) {
    const elems = document.querySelectorAll('.user-bio');
    elems.forEach(async (elem) => {
      elem.innerText = biodata;
    });
  },

  async _renderFollowers({ followers }) {
    const elems = document.querySelectorAll('.user-followers');
    elems.forEach(async (elem) => {
      elem.innerText = followers.length;
    });
  },

  async _renderFollowing({ following }) {
    const elems = document.querySelectorAll('.user-following');
    elems.forEach(async (elem) => {
      elem.innerText = following.length;
    });
  },

  async _renderEmail({ email }) {
    const elems = document.querySelectorAll('.user-email');
    elems.forEach(async (elem) => {
      elem.innerText = email;
    });
  },

  async _renderPhoneNumber({ phone_number }) {
    const elems = document.querySelectorAll('.user-phone-number');
    elems.forEach(async (elem) => {
      elem.innerText = phone_number;
    });
  },

  async _renderPostList({ posts }, currentUser) {
    const lists = document.querySelector('.post-list');
    if(posts.length < 1) {
      lists.innerHTML = Templates.profileEmptyPostsList();
      return;
    }

    lists.innerHTML = '';
    posts.forEach(async (post) => {
      if(currentUser) {
        lists.innerHTML += Templates.profilePost(post, currentUser.id);
      } else {
        lists.innerHTML += Templates.profilePost(post);
      }
    });

    await this._initLikeBtn(currentUser);
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
          await Swal.fire(
            'Oops ...',
            error.message,
            'error'
          );
        }
      });
    });
  },
};

export default profile;
