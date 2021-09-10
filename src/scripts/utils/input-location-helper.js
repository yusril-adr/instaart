import Swal from 'sweetalert2';
import Location from '../data/location';

const InputLocationHelper = {
  async init(provinceElem, cityElem) {
    this._initProvinceOption(provinceElem);

    provinceElem.addEventListener('change', (event) => {
      event.stopPropagation();
      this._initCityOptionByProvince(cityElem, provinceElem);
    });
  },

  async _initProvinceOption(provinceElem) {
    try {
      const provinces = await Location.getProvinces();

      provinceElem.innerHTML = '<option selected value="" disabled>Provinsi</option>';
      provinces.forEach(({ id, nama }) => {
        provinceElem.innerHTML += `<option value=${id}>${nama}</option>`;
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },

  async _initCityOptionByProvince(cityElem, provinceElem) {
    try {
      const cities = await Location.getCitiesByProvinceId(provinceElem.value);

      cityElem.innerHTML = '<option selected value="" disabled>Silahkan pilih provinsi</option>';
      cities.forEach(({ id, nama }) => {
        cityElem.innerHTML += `<option value=${id}>${nama}</option>`;
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },

  async confirmPassword(password, confirmPassword) {
    return password === confirmPassword;
  },
};

export default InputLocationHelper;
