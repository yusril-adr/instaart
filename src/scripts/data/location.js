import API_ENDPOINT from '../global/api-endpoint';

const Location = {
  async getProvinces() {
    const response = await fetch(API_ENDPOINT.PROVINCE);

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();
    if (response.status !== 200) {
      throw new Error(`Telah terjadi kesalahan dengan kode : ${response.status}`);
    }

    return responseJSON.provinsi;
  },

  async getCitiesByProvinceId(provinceId) {
    const response = await fetch(API_ENDPOINT.CITY(provinceId));

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();
    if (response.status !== 200) {
      throw new Error(`Telah terjadi kesalahan dengan kode : ${response.status}`);
    }

    return responseJSON.kota_kabupaten;
  },
};

export default Location;
