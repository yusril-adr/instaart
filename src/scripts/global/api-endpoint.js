import CONFIG from './config';

const API_ENDPOINT = {
  USER: `${CONFIG.API_BASE_URL}/user.php`,
  USER_PICTURE: `${CONFIG.API_BASE_URL}/user-image.php`,
  PASSWORD: `${CONFIG.API_BASE_URL}/password.php`,
  SIGN_IN: `${CONFIG.API_BASE_URL}/sign-in.php`,
  SIGN_OUT: `${CONFIG.API_BASE_URL}/sign-out.php`,
  ACTIVITIES: `${CONFIG.API_BASE_URL}/activities.php`,
  EXPLORE: `${CONFIG.API_BASE_URL}/explore.php`,
  MOST_LIKES_POST: `${CONFIG.API_BASE_URL}/most-likes-post.php`,
  FAVORITES: `${CONFIG.API_BASE_URL}/favorites.php`,
  BOOKMARK: `${CONFIG.API_BASE_URL}/bookmark.php`,
  FOLLOWERS: `${CONFIG.API_BASE_URL}/followers.php`,
  FOLLOWING: `${CONFIG.API_BASE_URL}/following.php`,
  LIKE_POST: `${CONFIG.API_BASE_URL}/like.php`,
  CATEGORIES: `${CONFIG.API_BASE_URL}/categories.php`,
  COLORS: `${CONFIG.API_BASE_URL}/colors.php`,
  POST: `${CONFIG.API_BASE_URL}/post.php`,
  POST_IMAGE: `${CONFIG.API_BASE_URL}/post-image.php`,
  COMMENT: `${CONFIG.API_BASE_URL}/comment.php`,
  JOB: `${CONFIG.API_BASE_URL}/job.php`,
  SEARCH: `${CONFIG.API_BASE_URL}/search.php`,
  PROVINCE: `${CONFIG.LOCATION_API_BASE_URL}/provinsi`,
  CITIES: (provinceId) => `${CONFIG.LOCATION_API_BASE_URL}/kota?id_provinsi=${provinceId}`,
  CITY: `${CONFIG.LOCATION_API_BASE_URL}/kota`,
};

export default API_ENDPOINT;
