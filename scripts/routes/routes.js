import home from '../views/pages/home.js';
import signUp from '../views/pages/sign-up.js';
import signOut from '../views/pages/sign-out.js';
import explore from '../views/pages/explore.js';
import profile from '../views/pages/profile.js';

const routes = {
  '/': home,
  '/sign-up': signUp,
  '/sign-out': signOut,
  '/explore': explore,
  '/profile': profile,
  '/profile/verb': profile,
};

export default routes;
