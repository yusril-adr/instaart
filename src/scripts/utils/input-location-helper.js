import Swal from 'sweetalert2';
import Location from '../data/location';
import Templates from '../views/templates/templates-creator';

const InputLocationHelper = {
  async init(provinceElem, cityElem, { defaultProvince = null, defaultCity = null } = {}) {
    await this._initProvinceOption(provinceElem);

    provinceElem.addEventListener('change', (event) => {
      event.stopPropagation();
      this._initCityOptionByProvince(cityElem, provinceElem);
    });

    if (defaultProvince && defaultCity) {
      const defaultOption = provinceElem.querySelector(`option[value="${defaultProvince}"]`);
      defaultOption.setAttribute('selected', '');
      this._initCityOptionByProvince(cityElem, provinceElem, { defaultCity });
    }
  },

  async _initProvinceOption(provinceElem) {
    try {
      const provinces = await Location.getProvinces();

      provinceElem.innerHTML = Templates.optionWithoutValue('Provinsi');
      provinces.forEach(({ id, nama }) => {
        provinceElem.innerHTML += Templates.optionWithValue(nama, id);
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },

  async _initCityOptionByProvince(cityElem, provinceElem, { defaultCity = null } = {}) {
    try {
      const cities = await Location.getCitiesByProvinceId(provinceElem.value);

      cityElem.innerHTML = '<option selected value="" disabled>Silahkan pilih provinsi</option>';
      cities.forEach(({ id, nama }) => {
        cityElem.innerHTML += `<option value=${id}>${nama}</option>`;
      });

      if (defaultCity) {
        const defaultOption = cityElem.querySelector(`option[value="${defaultCity}"]`);
        defaultOption.setAttribute('selected', '');
      }
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },
};

export default InputLocationHelper;
