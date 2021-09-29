import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import UrlParser from '../../routes/url-parser';
import User from '../../data/user';
import TitleHelper from '../../utils/title-helper';
import CONFIG from '../../global/config';

const profile = {
  async render() {
    return Templates.profilePage();
  },

  async afterRender(user) {
    const targetedUsername = await UrlParser.parseActiveUrlWithoutCombiner().verb;

    if (!targetedUsername && user) {
      window.location.hash = `#/profile/${user.username}/`;
      return;
    }

    if (!targetedUsername && !user) {
      window.location.hash = '#/';
      return;
    }

    if (user) await this._newPostBtn(targetedUsername, user.username);
    await this._renderProfile(targetedUsername, user);
  },

  async _newPostBtn(targetUsername, currentUsername) {
    if (targetUsername !== currentUsername) return;

    const container = document.querySelector('.container#profile');
    container.innerHTML += Templates.profileNewPost();
  },

  async _renderProfile(targetedUsername, currentUser) {
    let targetedUser;

    try {
      targetedUser = await User.getUserByUsername(targetedUsername);
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
      targetedUser = null;
    }

    if (!targetedUser) return this._renderNotFound();

    TitleHelper.setTitle(targetedUser.display_name);

    await this._renderProfileImage(targetedUser);
    await this._renderDisplayName(targetedUser);
    await this._renderUsername(targetedUser);
    await this._renderUserBtn(targetedUser, currentUser);
    await this._renderBio(targetedUser);
    await this._renderFollowers(targetedUser);
    await this._renderFollowing(targetedUser);
    await this._renderPhoneNumber(targetedUser);
    await this._renderProvince(targetedUser);
    await this._renderCity(targetedUser);
    await this._renderMailOrSignOutBtn(targetedUser, currentUser);
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
    if (!currentUser) return this._renderFollowBtnWithAlert();

    if (currentUser.id === targetedUser.id) return this._renderEditBtn();

    if (targetedUser.followers.includes(currentUser.id)) {
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
        'Akun diperlukan',
        'Silakan masuk atau daftar sebagai akun baru',
        'error',
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
          'error',
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
          'error',
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

  async _renderFollowers({ followers, username }) {
    const elems = document.querySelectorAll('.user-followers');
    elems.forEach(async (elem) => {
      elem.innerText = followers.length;
    });

    const anchor = document.querySelector('#followers-anchor');
    anchor.setAttribute('href', `#/followers/${username}`);
  },

  async _renderFollowing({ following, username }) {
    const elems = document.querySelectorAll('.user-following');
    elems.forEach(async (elem) => {
      elem.innerText = following.length;
    });

    const anchor = document.querySelector('#following-anchor');
    anchor.setAttribute('href', `#/following/${username}`);
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

  async _renderProvince({ province_name }) {
    const elems = document.querySelectorAll('.user-province');
    elems.forEach(async (elem) => {
      elem.innerText = province_name;
    });
  },

  async _renderCity({ city_name }) {
    const elems = document.querySelectorAll('.user-city');
    elems.forEach(async (elem) => {
      elem.innerText = city_name.split(' ').splice('1').join(' ');
    });
  },

  async _renderMailOrSignOutBtn(targetUser, currentUser) {
    const container = document.querySelector('#mail-or-signout-btn');

    if (targetUser.id !== currentUser?.id) {
      container.innerHTML = Templates.profileMailBtn();
      await this._initMailBtn(targetUser, currentUser);
      return;
    }

    container.innerHTML = Templates.profileSignOutBtn();
    await this._initSignOutBtn();
  },

  async _initMailBtn({ email }, currentUser) {
    const button = document.querySelector('#mail-btn');
    button.addEventListener('click', (event) => {
      event.stopPropagation();

      if (!currentUser) {
        return Swal.fire(
          'Akun diperlukan',
          'Silakan masuk atau daftar sebagai akun baru',
          'error',
        );
      }

      window.open(`mailto:${email}`);
    });
  },

  async _initSignOutBtn() {
    const btn = document.querySelector('#signout-btn');
    btn.addEventListener('click', async () => {
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'Apakah anda yakin?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya!',
          cancelButtonText: 'Tidak',
        });

        if (!isConfirmed) return;

        await User.signOut();

        const changeEvent = new CustomEvent('updateUser');
        window.dispatchEvent(changeEvent);
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
    });
  },

  async _renderPostList({ posts }, currentUser) {
    const lists = document.querySelector('.post-list');
    if (posts.length < 1) {
      lists.innerHTML = Templates.profileEmptyPostsList();
      return;
    }

    lists.innerHTML = '';
    posts.forEach(async (post) => {
      if (currentUser) {
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

          return this.afterRender(user);
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
};

export default profile;
