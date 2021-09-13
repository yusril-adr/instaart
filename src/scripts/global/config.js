const CONFIG = {
  API_BASE_URL: './api',
  LOCATION_API_BASE_URL: 'https://dev.farizdotid.com/api/daerahindonesia',
  AUTH_ID_KEY: 'auth_id',
  AUTH_TOKEN_KEY: 'auth_token',
  ENC_KEY: 'instaart123',
  PASSWORD_MIN_LENGTH: 8,
  MONTH: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  MAX_LENGTH: {
    USER: {
      USERNAME: 15,
      DISPLAY_NAME: 35,
      EMAIL: 35,
      PHONE_NUMBER: 20,
    },
    POST: {
      TITLE: 25,
    },
    JOB: {
      TITLE: 100,
    },
  },
  IMAGE_PATH: {
    BASE: './public/images',
    ILLUST: './public/images/illusts',
    USER: './public/images/users',
    POST: './public/images/posts',
  },
  CACHE_NAME: {
    API: 'instaart-api',
    IMAGE: 'instaart-image',
  },
  CACHE_EXP: 7 * 24 * 60 * 60, // 7 Days
  OLD_CACHE_NAME: ['instaart-cache-v1'],
};

export default CONFIG;
