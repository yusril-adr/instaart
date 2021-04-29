const CONFIG = {
  API_BASE_URL: './api',
  PASSWORD_MIN_LENGTH: 8,
  MONTH: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
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
