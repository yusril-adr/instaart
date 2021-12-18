import API_ENDPOINT from '../global/api-endpoint';
import Auth from './auth';

const Report = {
  async createReport(formData, formImage) {
    if (!navigator.onLine) throw new Error('Koneksi internet dibutuhkan.');

    const { authId, authToken } = await Auth.getAuth();

    const responseImg = await fetch(API_ENDPOINT.REPORT_IMAGE, {
      method: 'POST',
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: formImage,
    });

    if (responseImg.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }

    const responseImgJSON = await responseImg.json();

    if (responseImg.status !== 200) throw new Error(responseImgJSON.message);
    const imageName = responseImgJSON.fileName;

    console.log({ ...formData, reason_image: imageName });

    const responsePost = await fetch(`${API_ENDPOINT.REPORT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ ...formData, reason_image: imageName }),
    });

    if (responsePost.status === 500) {
      throw new Error('Server mengalami kegagalan atau server sedang dalam keadaan maintenance.');
    }
    const responsePostJSON = await responsePost.json();

    if (responsePost.status !== 200) throw new Error(responsePostJSON.message);

    return responsePostJSON;
  },
};

export default Report;
