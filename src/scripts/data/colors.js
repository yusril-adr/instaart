import API_ENDPOINT from '../global/api-endpoint';

const Colors = {
  async getColors() {
    const response = await fetch(API_ENDPOINT.COLORS);

    if (response.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseJSON = await response.json();
    if (response.status !== 200) {
      throw new Error(`Telah terjadi kesalahan dengan kode : ${response.status}`);
    }

    return responseJSON.colors;
  },
};

export default Colors;
