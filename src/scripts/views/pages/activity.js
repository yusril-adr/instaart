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
    const contentElem = document.querySelector('#activity-content');

    try {
      const activities = await User.getActivities();

      contentElem.innerHTML = '';

      if (activities.length < 1) {
        contentElem.innerHTML = Templates.activityEmpty();
        return;
      }

      activities.forEach((activityItem) => {
        if (activityItem.relation === 'follow') {
          contentElem.innerHTML += Templates.activityFollow(activityItem);
        } else if (activityItem.relation === 'comment') {
          contentElem.innerHTML += Templates.activityComment(activityItem);
        } else {
          contentElem.innerHTML += Templates.activityLike(activityItem);
        }
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );

      contentElem.innerHTML = '';
      contentElem.innerHTML = Templates.activityEmpty();
    }
  },
};

export default activity;
