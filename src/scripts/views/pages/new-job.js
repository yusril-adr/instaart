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
    await this._initTerms();
    await this._initSubmitEvent();
  },

  async _initInputLocation() {
    const provinceElem = document.querySelector('#province');
    const cityElem = document.querySelector('#city');

    await InputLocationHelper.init(provinceElem, cityElem);
  },

  async _initTerms() {
    const termsText = document.querySelector('#terms-text');
    termsText.addEventListener('click', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      await Swal.fire({
        html: `
          <span class="text-sm" style="display: block; text-align: left;">
            PERJANJIAN MENGUNGGAH PEKERJAAN di SITUS http://instaart.expectron.tech/<br>
            <br>
            Perjanjian Penggunaan Layanan Situs http://instaart.expectron.tech/ (Perjanjian) antara Pengguna sebagai pengunggah pekerjaan di situs http://instaart.expectron.tech/, ini memuat syarat-syarat dan ketentuan penggunaan layanan unggah pekerjaan situs http://instaart.expectron.tech/ .<br>
            <br>
            Mohon untuk membaca dengan hati-hati Perjanjian ini. Anda harus membaca, memahami, menerima dan menyetujui semua persyaratan dan ketentuan dalam Perjanjian ini sebelum menggunakan aplikasi dan/atau menerima konten yang terdapat di dalamnya.<br>
            Jika Anda tidak menerima dan menyetujui Perjanjian ini, anda tidak diperkenankan untuk mengunggah pekerjaan ke situs http://instaart.expectron.tech/.<br>
            <br>
            Ketentuan Mengunggah Pekerjaan<br>
            <br>
            1.  Setiap Pengguna yang  mengunggah pekerjaan berkewajiban penuh mengisi data pekerjaan dengan sebenar-benarnya.<br>
            2.  Setiap Pengguna bertanggung jawab atas seluruh infomasi pekerjaan yang telah di unggahnya ke http://instaart.expectron.tech/.<br>
            3.  Setiap Pengguna yang mengunggah pekerjaan wajib menunggu konfimasi admin untuk pekerjaan yang telah di unggah .<br>
            4.  Jika Data Pekerjaan yang di unggah tidak benar admin memiliki hak untuk menolak pekerjaan tersebut.<br>
            <br>
            PENUTUP<br>
            <br>
            <br>
            Dengan menggunakan aplikasi dan/atau melanjutkan akses terhadap situs http://instaart.expectron.tech/, Anda menyetujui persyaratan dan ketentuan Kami, dan oleh karena itu menyetujui untuk terikat dalam suatu kontrak dengan Kami dan oleh karenanya Anda menyatakan persetujuan untuk dapat menerima layanan dan akses atas seluruh konten yang terdapat dalam aplikasi ini.
          </span>
        `,
      });
    });
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
          shift: event.target.shift.value,
        };

        await this._formValidation(inputData);

        const job = await Job.newJob(inputData);

        await Swal.fire(
          'Berhasil',
          'Pekerjaan kamu akan muncul pada halaman pekerjaan setelah melalui proses validasi.',
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
