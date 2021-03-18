import API_ENDPOINT from '../global/api-endpoint.js';

const Post = {
  async getExplore() {
    const response = await fetch(API_ENDPOINT.EXPLORE);
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getPost(id) {
    const response = await fetch(`${API_ENDPOINT.POST}?id=${id}`);
    const responseJSON = await response.json();

    if (response.status === 404) return null;
    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async newPost(formData, formImage) {
    const responseImg = await fetch('./api/post-image.php', {
      method: 'POST',
      body: formImage,
    });
    const responseImgJSON = await responseImg.json();

    if (responseImg.status !== 200) throw new Error(responseImgJSON.message);
    const imageName = responseImgJSON.fileName;

    const responsePost = await fetch(`${API_ENDPOINT.POST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, image: imageName }),
    });
    const responsePostJSON = await responsePost.json();

    if (responsePost.status !== 200) throw new Error(responsePostJSON.message);

    return responsePostJSON;
  },

  async updatePost(inputData) {
    const response = await fetch(`${API_ENDPOINT.POST}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async deletePost(postId) {
    const response = await fetch(`${API_ENDPOINT.POST}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post_id: postId }),
    });
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },
};

export default Post;
