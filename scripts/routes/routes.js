import home from '../views/pages/home.js';
import signUp from '../views/pages/sign-up.js';
import signOut from '../views/pages/sign-out.js';
import explore from '../views/pages/explore.js';
import profile from '../views/pages/profile.js';
import editProfile from '../views/pages/edit-profile.js';
import editProfilePicture from '../views/pages/edit-profile-picture.js';
import editPassword from '../views/pages/edit-password.js';
import post from '../views/pages/post.js';
import newPost from '../views/pages/new-post.js';
import editPost from '../views/pages/edit-post.js';

const routes = {
  '/': home,
  '/sign-up': signUp,
  '/sign-out': signOut,
  '/explore': explore,
  '/profile': profile,
  '/profile/verb': profile,
  '/edit-profile': editProfile,
  '/edit-profile-picture': editProfilePicture,
  '/edit-password': editPassword,
  '/post': post,
  '/post/verb': post,
  '/new-post': newPost,
  '/edit-post': editPost,
  '/edit-post/verb': editPost,
};

export default routes;
