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
    'December'
  ],
  MAX_LENGTH: {
    USER: {
      USERNAME: 15,
      DISPLAY_NAME: 35,
      EMAIL: 35,
      PHONE_NUMBER: 20,
    },
  },
  IMAGE_PATH: {
    BASE: './public/images',
    ILLUST: './public/images/illusts',
    USER: './public/images/users',
    POST: './public/images/posts',
  },
};

export default CONFIG;
