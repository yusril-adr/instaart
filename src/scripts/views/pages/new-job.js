import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import TitleHelper from '../../utils/title-helper';
import CONFIG from '../../global/config';
import InputLocationHelper from '../../utils/input-location-helper';
import Job from '../../data/job';

const newJob = {
  async render() {
    return Templates.newJob();
  },

  async afterRender(user) {
    if (!user) {
      await Swal.fire(
        'Akun diperlukan',
        'Silakan masuk atau daftar sebagai akun baru',
        'error',
      );

      window.location.hash = '#/job/';
      return;
    }

    await TitleHelper.setTitle('Pekerjaan Baru');

    await this._initInputLocation();
    await this._initSubmitEvent();
  },

  async _initInputLocation() {
    const provinceElem = document.querySelector('#province');
    const cityElem = document.querySelector('#city');

    await InputLocationHelper.init(provinceElem, cityElem);
  },

  async _initSubmitEvent() {
    const form = document.querySelector('#job-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      const province_id = event.target.province.value;
      const city_id = event.target.city.value;

      try {
        const inputData = {
          title: event.target.title.value,
          description: event.target.description.value,
          form_link: event.target['form-link'].value,
          province_id,
          city_id,
          province_name: document.querySelector(`#province option[value="${province_id}"]`).innerHTML,
          city_name: document.querySelector(`#city option[value="${city_id}"]`).innerHTML,
          work_type: event.target['work-type'].value,
        };

        await this._formValidation(inputData);

        const job = await Job.newJob(inputData);

        await Swal.fire(
          'Berhasil',
          'Pekerjaan berhasil dibuat',
          'success',
        );
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
    if (input.title.length > MAX_LENGTH.JOB.TITLE) throw new Error('Judul terlalu panjang.');

    if (!(input.form_link.toLowerCase().startsWith('https://'))) throw new Error('Link tidak valid, link harus diawali dengan "https://"');
  },
};

export default newJob;
