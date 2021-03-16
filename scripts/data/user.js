import API_ENDPOINT from '../global/api-endpoint.js';

const User = {
  async getUser() {
    const response = await fetch(API_ENDPOINT.USER);
    const responseJSON = await response.json();

    if (response.status === 401) return null;
    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async signIn(identifier, password) {
    const response = await fetch(API_ENDPOINT.SIGN_IN, {
      method: 'POST',
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async signOut() {
    const response = await fetch(API_ENDPOINT.SIGN_OUT);
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },
};

export default User;
