import CONFIG from './config.js';

const API_ENDPOINT = {
  USER: `${CONFIG.API_BASE_URL}/user.php`,
  SIGN_IN: `${CONFIG.API_BASE_URL}/sign-in.php`,
  SIGN_OUT: `${CONFIG.API_BASE_URL}/sign-out.php`,
};

export default API_ENDPOINT;
