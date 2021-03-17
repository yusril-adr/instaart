import API_ENDPOINT from '../global/api-endpoint.js';

const Post = {
   async getExplore() {
    const response = await fetch(API_ENDPOINT.EXPLORE);
    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },
};

export default Post;
