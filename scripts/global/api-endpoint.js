import CONFIG from './config.js';

const API_ENDPOINT = {
  USER: `${CONFIG.API_BASE_URL}/user.php`,
  USER_PICTURE: `${CONFIG.API_BASE_URL}/user-image.php`,
  PASSWORD: `${CONFIG.API_BASE_URL}/password.php`,
  SIGN_IN: `${CONFIG.API_BASE_URL}/sign-in.php`,
  SIGN_OUT: `${CONFIG.API_BASE_URL}/sign-out.php`,
  EXPLORE: `${CONFIG.API_BASE_URL}/explore.php`,
  FOLLOWING: `${CONFIG.API_BASE_URL}/following.php`,
  LIKE_POST: `${CONFIG.API_BASE_URL}/like.php`,
};

export default API_ENDPOINT;
