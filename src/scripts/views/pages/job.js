import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import Job from '../../data/job';

const job = {
  async render() {
    return Templates.jobPage();
  },

  async afterRender() {
    try {
      const jobList = await Job.getJobs();

      if (jobList.length < 1) {
        const container = document.querySelector('#job .job-content');
        container.innerHTML = Templates.jobEmptyList();
        return;
      }

      await this._renderList(jobList);
      await this._initSearchEvent(jobList);
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },

  async _renderList(jobList) {
    const listElem = document.querySelector('.job-list');
    listElem.innerHTML = '';
    jobList.forEach((jobItem) => {
      listElem.innerHTML += Templates.jobItem(jobItem);
    });
  },

  async _initSearchEvent(jobList) {
    const searchForm = document.querySelector('#job-search-form');
    searchForm.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      const keyword = event.target['navbar-search-input'].value;
      const filterJobs = jobList.filter((jobItem) => (
        jobItem.title.toLowerCase().includes(keyword.toLowerCase())
      ));

      await this._renderList(filterJobs);
    });
  },
};

export default job;
