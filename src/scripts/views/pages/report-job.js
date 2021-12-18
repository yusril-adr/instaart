import Swal from 'sweetalert2';
import bsCustomFileInput from 'bs-custom-file-input';
import Templates from '../templates/templates-creator';
import UrlParser from '../../routes/url-parser';
import TitleHelper from '../../utils/title-helper';
import Report from '../../data/report';

const reportJob = {
  async render() {
    return Templates.jobReportPage();
  },

  async afterRender(user) {
    const jobId = await UrlParser.parseActiveUrlWithoutCombiner().verb;
    if (!jobId) {
      window.location.hash = '#/job/';
      return;
    }

    if (!user) {
      await Swal.fire(
        'Akun diperlukan',
        'Silakan masuk atau daftar sebagai akun baru',
        'error',
      );
      window.location.hash = '#/sign-in/';
      return;
    }

    await TitleHelper.setTitle('Laporkan Pekerjaan');

    // Init Bootstrap File Input Init
    bsCustomFileInput.init();
    await this._onChangeEvent();
    await this._initSubmitEvent(jobId);
  },

  async _onChangeEvent() {
    const reasonImageInput = document.querySelector('#reason-image');
    reasonImageInput.addEventListener('change', () => {
      const preview = document.querySelector('#preview-image img');
      const file = document.querySelector('#reason-image').files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        // convert image file to base64 string
        preview.src = reader.result;

        const previewImageContainer = document.querySelector('#preview-image');
        if (previewImageContainer.classList.contains('d-none')) {
          previewImageContainer.classList.remove('d-none');
        }
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  },

  async _initSubmitEvent(jobId) {
    const form = document.querySelector('#report-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      try {
        const inputData = {
          reason: event.target.reason.value,
          type: 'job',
          reported_id: jobId,
        };

        const formImg = new FormData();
        formImg.append('reason_image', event.target['reason-image'].files[0]);

        Swal.showLoading();

        await Report.createReport(inputData, formImg);

        await Swal.fire(
          'Laporan berhasil diunggah!',
          'Kami akan memberi tahukan proses kami lewat email anda nanti.',
          'success',
        );
        window.location.hash = '#/job/';
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

export default reportJob;
