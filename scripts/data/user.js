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
      'Content-Type': 'application/json',
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

  async signUp({
      username,
      password,
      display_name,
      biodata,
      email,
      phone_number,
  }) {
    const response = await fetch(API_ENDPOINT.SIGN_UP, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({
        username,
        password,
        display_name,
        biodata,
        email,
        phone_number,
      }),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },
};

export default User;
