import home from '../views/pages/home.js';
import signUp from '../views/pages/sign-up.js';
import signOut from '../views/pages/sign-out.js';
import explore from '../views/pages/explore.js';
import profile from '../views/pages/profile.js';
import editProfile from '../views/pages/edit-profile.js';
import editProfilePicture from '../views/pages/edit-profile-picture.js';
import editPassword from '../views/pages/edit-password.js';

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
};

export default routes;
