import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import UrlParser from '../../routes/url-parser';
import User from '../../data/user';
import TitleHelper from '../../utils/title-helper';

const followers = {
  async render() {
    return Templates.followingPage();
  },

  async afterRender(user) {
    const targetedUsername = await UrlParser.parseActiveUrlWithoutCombiner().verb;

    if (!targetedUsername && user) {
      window.location.hash = `#/following/${user.username}/`;
      return;
    }

    if (!targetedUsername && !user) {
      window.location.hash = '#/';
      return;
    }

    await this._renderContent(targetedUsername, user);
  },

  async _renderContent(targetedUsername) {
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

    TitleHelper.setTitle(`Diikuti ${targetedUser.display_name}`);

    await this._renderUsername(targetedUser);

    await this._renderList(targetedUser);
  },

  async _renderUsername({ username }) {
    const elems = document.querySelectorAll('.user-username');
    elems.forEach(async (elem) => {
      elem.innerText = username;
    });
  },

  async _renderList({ username }, customList = null) {
    try {
      let userList;

      if (customList) userList = customList;
      else userList = await User.getFollowing(username);

      const container = document.querySelector('.user-list');
      if (userList.length < 1) {
        container.innerHTML = Templates.followUserEmptyResult();
        return;
      }

      container.innerHTML = '';
      userList.forEach(async (user) => {
        container.innerHTML += Templates.followUserResult(user);
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
};

export default followers;
