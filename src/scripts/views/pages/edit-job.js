import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import UrlParser from '../../routes/url-parser';
import TitleHelper from '../../utils/title-helper';
import Job from '../../data/job';
import CONFIG from '../../global/config';
import InputLocationHelper from '../../utils/input-location-helper';

const editJob = {
  async render() {
    return Templates.editJob();
  },

  async afterRender(user) {
    const jobId = await UrlParser.parseActiveUrlWithoutCombiner().verb;
    let job;

    try {
      job = await Job.getJob(jobId);
    } catch (error) {
      job = null;
    }

    if (!user || !job) {
      window.location.hash = '#/';
      return;
    }

    await TitleHelper.setTitle(`Edit ${job.title}`);
    await this._initInputLocation(job);
    await this._setDefaultValue(job);
    await this._submitEvent(job);
    await this._initDeleteEvent(job);
  },

  async _initInputLocation(job) {
    const provinceElem = document.querySelector('#province');
    const cityElem = document.querySelector('#city');

    await InputLocationHelper.init(provinceElem, cityElem, {
      defaultProvince: job.province_id,
      defaultCity: job.city_id,
    });
  },

  async _setDefaultValue(job) {
    const title = document.querySelector('input#title');
    title.value = job.title;

    const description = document.querySelector('textarea#description');
    description.value = job.description;

    const workTime = document.querySelector(`#work-time option[value="${job.work_time}"]`);
    workTime.setAttribute('selected', '');

    const formLink = document.querySelector('input#form-link');
    formLink.value = job.form_link;
  },

  async _submitEvent(job) {
    const form = document.querySelector('#job-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      const province_id = event.target.province.value;
      const city_id = event.target.city.value;

      try {
        const inputData = {
          job_id: job.id,
          title: event.target.title.value,
          description: event.target.description.value,
          form_link: event.target['form-link'].value,
          province_id,
          city_id,
          province_name: document.querySelector(`#province option[value="${province_id}"]`).innerHTML,
          city_name: document.querySelector(`#city option[value="${city_id}"]`).innerHTML,
          work_time: event.target['work-time'].value,
        };

        await this._formValidation(inputData);
        await Job.updateJob(inputData);

        window.location.hash = `#/job/${job.id}`;
        return;
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
    });
  },

  async _formValidation(input) {
    const { MAX_LENGTH } = CONFIG;

    if (input.title.length > MAX_LENGTH.JOB.TITLE) throw new Error('Job title is too long.');

    if (!(input.form_link.toLowerCase().startsWith('https://'))) throw new Error('Link tidak valid, link harus diawali dengan "https://"');
  },

  async _initDeleteEvent(job) {
    const button = document.querySelector('#delete-button');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      try {
        const { isConfirmed } = await Swal.fire({
          title: 'Apakah kamu yakin?',
          text: 'Pekerjaan yang dihapus tidak akan bisa dikembalikan.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'batalkan',
        });

        if (!isConfirmed) return;

        await Job.deleteJob(job.id);

        await Swal.fire(
          'Terhapus!',
          'Pekerjaan berhasil dihapus.',
          'success',
        );

        window.location.hash = '#/job';
        return;
      } catch (error) {
        await Swal.fire(
          'Oops ...',
          error.message,
          'error',
        );
      }
    });
  },
};

export default editJob;
