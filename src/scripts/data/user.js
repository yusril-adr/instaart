import API_ENDPOINT from '../global/api-endpoint';
import Auth from './auth';

const User = {
  async getUser() {
    const { authId, authToken } = await Auth.getAuth();

    console.log(authId, authToken);

    const response = await fetch(API_ENDPOINT.USER, {
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
    });
    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status === 401) return null;

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getUserByUsername(username) {
    const response = await fetch(`${API_ENDPOINT.USER}?username=${username}`);

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

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
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.USER, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({
        username,
        display_name,
        biodata,
        email,
        phone_number,
      }),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async updatePassword({
    new_password,
    current_password,
  }) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.PASSWORD, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({
        new_password,
        current_password,
      }),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async updatePicture(formData) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.USER_PICTURE, {
      method: 'POST',
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: formData,
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async removePicture() {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.USER_PICTURE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ setDefault: true }),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

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
    province_id,
    city_id,
  }) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const response = await fetch(API_ENDPOINT.USER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        display_name,
        biodata,
        email,
        phone_number,
        province_id,
        city_id,
      }),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    await Auth.setAuth(responseJSON.user.id, responseJSON.token);

    return responseJSON.user;
  },

  async signIn(identifier, password) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const response = await fetch(API_ENDPOINT.SIGN_IN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    await Auth.setAuth(responseJSON.user.id, responseJSON.token);

    return responseJSON.user;
  },

  async signOut() {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.SIGN_OUT, {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    await Auth.clear();

    return responseJSON;
  },

  async followUser(userId) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.FOLLOWING, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async unFollowUser(userId) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.FOLLOWING, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async likePost(postId) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.LIKE_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ post_id: postId }),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async dislikePost(postId) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.LIKE_POST, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ post_id: postId }),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async commentPost(inputData) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.COMMENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify(inputData),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async searchUser(keyword) {
    const response = await fetch(`${API_ENDPOINT.SEARCH}?keyword=${keyword}`);

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON.user;
  },
};

export default User;
