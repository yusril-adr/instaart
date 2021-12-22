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

    await this._initSearchEvent({ user, currentTotalJob });

    await this._initFilterEvent({ user, currentTotalJob });
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

  async _initSearchEvent({ user, currentTotalJob }) {
    const searchForm = document.querySelector('#job-search-form');
    searchForm.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      const keyword = event.target['job-search-input'].value;
      const workType = document.querySelector('#work-type').value;
      const shift = document.querySelector('#shift').value;
      const filterJobs = await Job.searchJob(keyword, {
        work_type: workType !== 'Semua' ? workType : '',
        shift: shift !== 'Semua' ? shift : '',
      });

      await this._renderList({ jobList: filterJobs, user, currentTotalJob });
    });
  },

  async _initFilterEvent({ user, currentTotalJob }) {
    const workTypeElem = document.querySelector('#work-type');
    workTypeElem.addEventListener('change', async (event) => {
      event.stopPropagation();

      const inputSearch = document.querySelector('#job-search-input');

      const keyword = inputSearch.value;
      const workType = workTypeElem.value;
      const shift = document.querySelector('#shift').value;
      const filterJobs = await Job.searchJob(keyword, {
        work_type: workType !== 'Semua' ? workType : '',
        shift: shift !== 'Semua' ? shift : '',
      });

      await this._renderList({ jobList: filterJobs, user, currentTotalJob });
    });

    const shiftElem = document.querySelector('#shift');
    shiftElem.addEventListener('change', async (event) => {
      event.stopPropagation();

      const inputSearch = document.querySelector('#job-search-input');

      const keyword = inputSearch.value;
      const workType = workTypeElem.value;
      const shift = document.querySelector('#shift').value;
      const filterJobs = await Job.searchJob(keyword, {
        work_type: workType !== 'Semua' ? workType : '',
        shift: shift !== 'Semua' ? shift : '',
      });

      await this._renderList({ jobList: filterJobs, user, currentTotalJob });
    });
  },
};

export default job;
