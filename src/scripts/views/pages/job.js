import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import Job from '../../data/job';
import TitleHelper from '../../utils/title-helper';

const job = {
  async render() {
    return Templates.jobPage();
  },

  async afterRender() {
    try {
      await TitleHelper.setTitle('Pekerjaan');
      const jobList = await Job.getJobs();

      if (jobList.length < 1) {
        const container = document.querySelector('#job .job-content');
        container.innerHTML = Templates.jobEmptyList();
        return;
      }

      await this._renderList(jobList);
      // await this._renderSearch(jobList);
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

    if (jobList.length < 1) {
      listElem.innerHTML = Templates.jobSearchNotFound();
      return;
    }

    jobList.forEach((jobItem) => {
      listElem.innerHTML += Templates.jobItem(jobItem);
    });
  },

  async _renderSearch(jobList) {
    const container = document.querySelector('#job .container');
    const jobContent = container.querySelector('.job-content');

    const searchElement = document.createElement('div');
    searchElement.className = 'card mt-4 p-4 shadow';
    searchElement.style.borderRadius = '1rem';
    searchElement.innerHTML = Templates.jobSearchForm();

    container.insertBefore(searchElement, jobContent);

    await this._initSearchEvent(jobList);
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
