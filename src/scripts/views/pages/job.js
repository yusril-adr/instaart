import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import Job from '../../data/job';

const job = {
  async render() {
    return Templates.jobPage();
  },

  async afterRender() {
    await this._renderList();
  },

  async _renderList() {
    try {
      const jobLists = await Job.getJobs();

      if (jobLists.length < 1) {
        const container = document.querySelector('#job .job-content');
        container.innerHTML = Templates.jobEmptyList();
        return;
      }

      const listElem = document.querySelector('.job-list');
      listElem.innerHTML = '';
      jobLists.forEach((jobItem) => {
        listElem.innerHTML += Templates.jobItem(jobItem);
      });
    } catch (error) {
      console.log(error);
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },
};

export default job;
