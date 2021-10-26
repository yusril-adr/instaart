import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import UrlParser from '../../routes/url-parser';
import User from '../../data/user';
import TitleHelper from '../../utils/title-helper';
import CONFIG from '../../global/config';

const followers = {
  async render() {
    return Templates.followersPage();
  },

  async afterRender(user, currentTotalUser = null) {
    const targetedUsername = await UrlParser.parseActiveUrlWithoutCombiner().verb;

    if (!targetedUsername && user) {
      window.location.hash = `#/followers/${user.username}/`;
      return;
    }

    if (!targetedUsername && !user) {
      window.location.hash = '#/';
      return;
    }

    await this._renderContent(targetedUsername, user, currentTotalUser);
  },

  async _renderContent(targetedUsername, currentUser, currentTotalUser) {
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

    TitleHelper.setTitle(`Pengikut ${targetedUser.display_name}`);

    await this._renderUsername(targetedUser);

    await this._renderList(targetedUser, currentUser, currentTotalUser);
  },

  async _renderUsername({ username }) {
    const elems = document.querySelectorAll('.user-username');
    elems.forEach(async (elem) => {
      elem.innerText = username;
    });
  },

  async _renderList({ username }, currentUser, currentTotalUser = null) {
    try {
      const userList = await User.getFollowers(username);

      const currentTotalUserFormated = currentTotalUser || userList.length;
      const currentTotalRenderUser = currentTotalUserFormated > CONFIG.USER_LIST_DEFAULT_LENGTH
        && currentTotalUser === null ? CONFIG.USER_LIST_DEFAULT_LENGTH : currentTotalUserFormated;

      const container = document.querySelector('.user-list');
      if (userList.length < 1) {
        container.innerHTML = Templates.followUserEmptyResult();
        return;
      }

      container.innerHTML = '';
      userList.forEach(async (user, userIndex) => {
        if (userIndex + 1 > currentTotalRenderUser) return;

        container.innerHTML += Templates.followUserResult(user);
      });

      await this._initLoadMoreBtn({
        currentUser,
        currentTotalRenderUser,
        userList,
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );

      const container = document.querySelector('.user-list');
      container.innerHTML = Templates.followUserEmptyResult();
    }
  },

  async _initLoadMoreBtn({
    currentUser,
    currentTotalRenderUser,
    userList,
  }) {
    const btnContainer = document.querySelector('#load-btn');

    if (currentTotalRenderUser === userList.length || userList.length === 0) {
      btnContainer.innerHTML = '';
      return;
    }

    btnContainer.innerHTML = Templates.loadMoreBtn();

    const loadBtn = document.querySelector('#load-btn button');
    loadBtn.addEventListener('click', async (event) => {
      event.stopPropagation();

      const userDifference = userList.length - currentTotalRenderUser;
      const afterTotalRenderUser = userDifference < CONFIG.USER_LIST_DEFAULT_LENGTH
        ? currentTotalRenderUser + userDifference
        : currentTotalRenderUser + CONFIG.USER_LIST_DEFAULT_LENGTH;
      await this.afterRender(currentUser, afterTotalRenderUser);
    });
  },
};

export default followers;
