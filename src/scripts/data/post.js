import API_ENDPOINT from '../global/api-endpoint';
import Auth from './auth';

const Post = {
  async getExplore() {
    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.EXPLORE, {
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();
    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getBookmarkPosts() {
    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.BOOKMARK, {
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

  async getFavorites() {
    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.FAVORITES, {
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();
    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getPost(id, { insight = false } = {}) {
    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(`${API_ENDPOINT.POST}?id=${id}&insight=${insight ? 1 : ''}`, {
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status === 404) return null;

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async newPost(formData, formImage) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const responseImg = await fetch('./api/post-image.php', {
      method: 'POST',
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: formImage,
    });

    if (responseImg.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseImgJSON = await responseImg.json();

    if (responseImg.status !== 200) throw new Error(responseImgJSON.message);
    const imageName = responseImgJSON.fileName;

    const responsePost = await fetch(`${API_ENDPOINT.POST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ ...formData, image: imageName }),
    });

    if (responsePost.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }
    const responsePostJSON = await responsePost.json();

    if (responsePost.status !== 200) throw new Error(responsePostJSON.message);

    return responsePostJSON;
  },

  async updatePost(inputData) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(`${API_ENDPOINT.POST}`, {
      method: 'PUT',
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

  async deletePost(postId) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(`${API_ENDPOINT.POST}`, {
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

  async searchPost(keyword) {
    const response = await fetch(`${API_ENDPOINT.SEARCH}?keyword=${keyword}`);
    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON.post;
  },
};

export default Post;
