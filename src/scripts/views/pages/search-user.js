import Swal from 'sweetalert2';
import Templates from '../templates/templates-creator';
import TitleHelper from '../../utils/title-helper';
import UrlParser from '../../routes/url-parser';
import User from '../../data/user';
import Location from '../../data/location';

const searchUser = {
  async render() {
    return Templates.searchPage();
  },

  async afterRender() {
    let keyword = await UrlParser.parseActiveUrlWithoutCombiner().verb;
    if (!keyword) keyword = '';

    keyword = keyword.trim();

    await TitleHelper.setTitle(`Cari ${keyword}`);
    await this._setDefaultValue(keyword);
    await this._initNav(keyword);
    await this._initFilter();
    await this._renderResult(keyword);
    await this._initSearchForm(keyword);
  },

  async _setDefaultValue(keyword) {
    const inputSearch = document.querySelector('#search-input');
    inputSearch.value = keyword;
  },

  async _initNav(keyword) {
    const navSearch = document.querySelector('#search-nav');
    navSearch.innerHTML = Templates.searchUserNav(keyword);

    const filterElem = document.querySelector('#filter-input');
    filterElem.innerHTML = Templates.searchUserFilter();

    const provincies = await Location.getProvinces();

    const provinceElem = document.querySelector('#province');
    provinceElem.innerHTML = Templates.optionWithValue('Semua', 0);
    provincies.forEach((province) => {
      provinceElem.innerHTML += Templates.optionWithValue(province.nama, province.id);
    });

    const cityElem = document.querySelector('#city');
    cityElem.innerHTML = Templates.optionWithValue('Semua', 0);
  },

  async _initFilter() {
    const provinceElem = document.querySelector('#province');
    provinceElem.addEventListener('change', async (event) => {
      event.stopPropagation();

      const inputSearch = document.querySelector('#search-input');

      const keyword = inputSearch.value;
      const province_id = parseInt(event.target.value);

      const filteredUsers = await User.searchUser(keyword, {
        province: province_id === 0 ? null : province_id,
      });

      const cityElem = document.querySelector('#city');
      cityElem.innerHTML = Templates.optionWithValue('Semua', 0);

      const cities = await Location.getCitiesByProvinceId(province_id);
      cities.forEach((city) => {
        cityElem.innerHTML += Templates.optionWithValue(city.nama, city.id);
      });

      await this._renderResult(keyword, filteredUsers);
    });

    const cityElem = document.querySelector('#city');
    cityElem.addEventListener('change', async (event) => {
      event.stopPropagation();

      const inputSearch = document.querySelector('#search-input');

      const keyword = inputSearch.value;
      const province_id = parseInt(provinceElem.value);
      const city_id = parseInt(event.target.value);

      const filteredUsers = await User.searchUser(keyword, {
        province: province_id === 0 ? null : province_id,
        city: city_id === 0 ? null : city_id,
      });

      await this._renderResult(keyword, filteredUsers);
    });
  },

  async _renderResult(keyword, filteredUsers) {
    try {
      let users;

      if (filteredUsers) users = filteredUsers;
      else users = await User.searchUser(keyword);

      const container = document.querySelector('#result-container');

      if (users.length < 1 || keyword === '') {
        container.innerHTML = Templates.searchEmptyResult();
        return;
      }

      container.innerHTML = '';
      users.forEach(async (user) => {
        container.innerHTML += Templates.searchUserResult(user);
      });
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );

      const container = document.querySelector('#result-container');
      container.innerHTML = Templates.searchEmptyResult();
    }
  },

  async _initSearchForm() {
    const form = document.querySelector('#search-form');
    form.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      window.location.hash = `#/search-user/${event.target['search-input'].value.trim() || ''}`;
    });
  },
};

export default searchUser;
