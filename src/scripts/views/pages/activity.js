import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import User from '../../data/user';
import TitleHelper from '../../utils/title-helper';

const activity = {
  async render() {
    return Templates.activityPage();
  },

  async afterRender(user) {
    if (!user) {
      window.location.hash = '#/';
      return;
    }

    await TitleHelper.setTitle('Aktivitas');

    await this._renderActivities();
  },

  async _renderActivities() {
    try {
      const activities = await User.getActivities();

      // if (activities.length < 1) {

      // }

      const contentElem = document.querySelector('#activity-content');
      contentElem.innerHTML = '';

      activities.forEach((activityItem) => {
        contentElem.innerHTML += activityItem.relation === 'follow'
          ? Templates.activityFollow(activityItem) : Templates.activityComment(activityItem);
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },
};

export default activity;
