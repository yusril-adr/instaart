import CryptoJS from 'crypto-js';
import CONFIG from '../global/config';

const Auth = {
  async getAuth() {
    let authId;
    let authToken;

    if (!window.localStorage.getItem(CONFIG.AUTH_ID_KEY)) authId = '';
    else {
      authId = (CryptoJS.AES.decrypt(
        window.localStorage.getItem(CONFIG.AUTH_ID_KEY),
        CONFIG.ENC_KEY,
      ).toString(CryptoJS.enc.Utf8));
    }

    if (!window.localStorage.getItem(CONFIG.AUTH_TOKEN_KEY)) authToken = '';
    else {
      authToken = (CryptoJS.AES.decrypt(
        window.localStorage.getItem(CONFIG.AUTH_TOKEN_KEY),
        CONFIG.ENC_KEY,
      ).toString(CryptoJS.enc.Utf8));
    }

    return { authId, authToken };
  },

  async setAuth(id, token) {
    const encryptedId = CryptoJS.AES.encrypt(id, CONFIG.ENC_KEY);
    const encryptedToken = CryptoJS.AES.encrypt(token, CONFIG.ENC_KEY);

    window.localStorage.setItem(CONFIG.AUTH_ID_KEY, encryptedId);
    window.localStorage.setItem(CONFIG.AUTH_TOKEN_KEY, encryptedToken);
  },

  async clear() {
    window.localStorage.clear();
  },
};

export default Auth;
