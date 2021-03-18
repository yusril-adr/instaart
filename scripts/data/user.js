import API_ENDPOINT from '../global/api-endpoint.js';

const User = {
  async getUser() {
    const response = await fetch(API_ENDPOINT.USER);
    const responseJSON = await response.json();

    if (response.status === 401) return null;
    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getUserByUsername(username) {
    const response = await fetch(`${API_ENDPOINT.USER}?username=${username}`);
    const responseJSON = await response.json();

    if (response.status === 404) return null;
    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async update({
      username,
      display_name,
      biodata,
      email,
      phone_number,
  }) {
    const response = await fetch(API_ENDPOINT.USER, {
      method: 'PUT',
      'Content-Type': 'application/json',
      body: JSON.stringify({
        username,
        display_name,
        biodata,
        email,
        phone_number: parseInt(phone_number),
      }),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async updatePassword({
      new_password,
      current_password,
  }) {
    const response = await fetch(API_ENDPOINT.PASSWORD, {
      method: 'PUT',
      'Content-Type': 'application/json',
      body: JSON.stringify({
        new_password,
        current_password,
      }),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async updatePicture(formData) {
    const response = await fetch(API_ENDPOINT.USER_PICTURE, {
      method: 'POST',
      body: formData,
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async removePicture() {
    const response = await fetch(API_ENDPOINT.USER_PICTURE, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({ setDefault: true }),
    });
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
    const response = await fetch(API_ENDPOINT.USER, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({
        username,
        password,
        display_name,
        biodata,
        email,
        phone_number: parseInt(phone_number),
      }),
    });
    const responseJSON = await response.json();

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

  async followUser(userId) {
    const response = await fetch(API_ENDPOINT.FOLLOWING, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({ user_id: userId }),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async unFollowUser(userId) {
    const response = await fetch(API_ENDPOINT.FOLLOWING, {
      method: 'DELETE',
      'Content-Type': 'application/json',
      body: JSON.stringify({ user_id: userId }),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async likePost(postId) {
    const response = await fetch(API_ENDPOINT.LIKE_POST, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({ post_id: postId }),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async dislikePost(postId) {
    const response = await fetch(API_ENDPOINT.LIKE_POST, {
      method: 'DELETE',
      'Content-Type': 'application/json',
      body: JSON.stringify({ post_id: postId }),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async commentPost(inputData) {
    const response = await fetch(API_ENDPOINT.COMMENT, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(inputData),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async searchUser(keyword) {
    const response = await fetch(`${API_ENDPOINT.SEARCH}?keyword=${keyword}`);
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON.user;
  },
};

export default User;
