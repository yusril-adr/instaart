import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import UrlParser from '../../routes/url-parser';
import Job from '../../data/job';
import TitleHelper from '../../utils/title-helper';
import CONFIG from '../../global/config';

const jobDetail = {
  async render() {
    return Templates.jobDetailPage();
  },

  async afterRender(user) {
    const jobId = await UrlParser.parseActiveUrlWithoutCombiner().verb;

    await this._renderJob(jobId, user);
  },

  async _renderJob(jobId, currentUser) {
    let job;

    try {
      job = await Job.getJob(jobId);
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
      job = null;
    }

    if (!job) return this._renderNotFound();

    TitleHelper.setTitle(job.title);

    await this._renderProfileImage(job);
    await this._renderTitle(job);
    await this._renderDisplayName(job);
    await this._renderEditBtn(job, currentUser);
    await this._renderDescription(job);
    await this._renderLocation(job);
    await this._renderWorkTime(job);
    await this._initApplyButton(job, currentUser);
  },

  async _renderNotFound() {
    const container = document.querySelector('.container#job');
    container.innerHTML = Templates.jobNotFound();
  },

  async _renderProfileImage({ user_image }) {
    const elems = document.querySelectorAll('.user-image-element');
    elems.forEach(async (elem) => {
      elem.src = `${CONFIG.IMAGE_PATH.USER}/${user_image}`;
    });
  },

  async _renderTitle({ title }) {
    const elems = document.querySelectorAll('.job-title');
    elems.forEach(async (elem) => {
      elem.innerText = title;
    });
  },

  async _renderDisplayName({ display_name }) {
    const elems = document.querySelectorAll('.user-display-name');
    elems.forEach(async (elem) => {
      elem.innerText = display_name;
    });
  },

  async _renderEditBtn(job, currentUser) {
    if (job.user_id !== currentUser?.id) return;

    const container = document.querySelector('#edit-button-container');
    container.innerHTML = Templates.jobEditBtn(job.id);
  },

  async _renderDescription({ description }) {
    const elems = document.querySelectorAll('.job-desc');
    elems.forEach(async (elem) => {
      elem.innerText = description;
    });
  },

  async _renderLocation({ province_name, city_name }) {
    const elems = document.querySelectorAll('.job-location');
    elems.forEach(async (elem) => {
      elem.innerText = ` ${city_name}, ${province_name}`;
    });
  },

  async _renderWorkTime({ work_time }) {
    const elems = document.querySelectorAll('.job-work-time');
    elems.forEach(async (elem) => {
      elem.innerText = work_time;
    });
  },

  async _initApplyButton(job, user) {
    const button = document.querySelector('#apply-button');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      try {
        if (!user) {
          await Swal.fire(
            'Akun diperlukan',
            'Silakan masuk atau daftar sebagai akun baru',
            'error',
          );
          return;
        }

        const { isConfirmed } = await Swal.fire({
          title: 'Peringatan !',
          text: 'Kami menghimbau untuk berhati-hati dalam memilih pekerjaan.',
          footer: '<span class="text-center d-block">Kami tidak menanggung segala bentuk penipuan yang terjadi.</span>',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Lanjutkan!',
          cancelButtonText: 'batalkan',
        });

        if (!isConfirmed) return;

        window.open(job.form_link);
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

export default jobDetail;