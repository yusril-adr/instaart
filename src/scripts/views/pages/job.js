import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import Job from '../../data/job';
import TitleHelper from '../../utils/title-helper';
import CONFIG from '../../global/config';

const job = {
  async render() {
    return Templates.jobPage();
  },

  async afterRender(user, currentTotalJob = null) {
    try {
      await TitleHelper.setTitle('Pekerjaan');
      const jobList = await Job.getJobs();

      if (jobList.length < 1) {
        const container = document.querySelector('#job .job-content');
        container.innerHTML = Templates.jobEmptyList();
        return;
      }

      await this._renderList({ jobList, user, currentTotalJob });
      // await this._renderSearch({ jobList, user, currentTotalJob });
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

      listElem.innerHTML += Templates.jobItem(jobItem);
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

  async _renderSearch({ jobList, user, currentTotalJob }) {
    const container = document.querySelector('#job .container');
    const jobContent = container.querySelector('.job-content');

    const searchElement = document.createElement('div');
    searchElement.className = 'card mt-4 p-4 shadow';
    searchElement.style.borderRadius = '1rem';
    searchElement.innerHTML = Templates.jobSearchForm();

    container.insertBefore(searchElement, jobContent);

    await this._initSearchEvent({ jobList, user, currentTotalJob });
  },

  async _initSearchEvent({ jobList, user, currentTotalJob }) {
    const searchForm = document.querySelector('#job-search-form');
    searchForm.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      const keyword = event.target['navbar-search-input'].value;
      const filterJobs = jobList.filter((jobItem) => (
        jobItem.title.toLowerCase().includes(keyword.toLowerCase())
      ));

      await this._renderList({ jobList: filterJobs, user, currentTotalJob });
    });
  },
};

export default job;
