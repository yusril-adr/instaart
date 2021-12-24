import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import Job from '../../data/job';
import TitleHelper from '../../utils/title-helper';
import CONFIG from '../../global/config';

const userJobs = {
  async render() {
    return Templates.jobUserPage();
  },

  async afterRender(user, currentTotalJob = null) {
    try {
      await TitleHelper.setTitle('Pekerjaan yang Kamu Buat');
      const jobList = await Job.getUserJobs();

      if (jobList.length < 1) {
        const container = document.querySelector('#user-jobs .job-content');
        container.innerHTML = Templates.jobUserEmptyList();
        return;
      }

      await this._renderList({ jobList, user, currentTotalJob });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },

  async _renderList({ jobList, user, currentTotalJob }) {
    const currentTotalJobFormated = currentTotalJob || jobList.length;
    const currentTotalRenderJob = currentTotalJobFormated > CONFIG.JOB_LIST_DEFAULT_LENGTH
      && currentTotalJob === null ? CONFIG.JOB_LIST_DEFAULT_LENGTH : currentTotalJobFormated;

    const listElem = document.querySelector('.job-list');
    listElem.innerHTML = '';

    if (jobList.length < 1) {
      listElem.innerHTML = Templates.jobSearchNotFound();
      return;
    }

    jobList.forEach((jobItem, jobIndex) => {
      if (jobIndex + 1 > currentTotalRenderJob) return;

      listElem.innerHTML += Templates.jobUserItem(jobItem);
    });

    await this._initLoadMoreBtn({
      user,
      currentTotalRenderJob,
      jobList,
    });
  },

  async _initLoadMoreBtn({
    user,
    currentTotalRenderJob,
    jobList,
  }) {
    const btnContainer = document.querySelector('#load-btn');

    if (currentTotalRenderJob === jobList.length || jobList.length === 0) {
      btnContainer.innerHTML = '';
      return;
    }

    btnContainer.innerHTML = Templates.loadMoreBtn();

    const loadBtn = document.querySelector('#load-btn button');
    loadBtn.addEventListener('click', async (event) => {
      event.stopPropagation();

      const jobDifference = jobList.length - currentTotalRenderJob;
      const afterTotalRenderJob = jobDifference < CONFIG.JOB_LIST_DEFAULT_LENGTH
        ? currentTotalRenderJob + jobDifference
        : currentTotalRenderJob + CONFIG.JOB_LIST_DEFAULT_LENGTH;
      await this.afterRender(user, afterTotalRenderJob);
    });
  },
};

export default userJobs;
