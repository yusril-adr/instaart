import CONFIG from '../global/config';

const Auth = {
  async getAuth() {
    const authId = window.localStorage.getItem(CONFIG.AUTH_ID_KEY) || '';
    const authToken = window.localStorage.getItem(CONFIG.AUTH_TOKEN_KEY) || '';

    return { authId, authToken };
  },

  async setAuth(id, token) {
    window.localStorage.setItem(CONFIG.AUTH_ID_KEY, id);
    window.localStorage.setItem(CONFIG.AUTH_TOKEN_KEY, token);
  },

  async clear() {
    window.localStorage.clear();
  },
};

export default Auth;
