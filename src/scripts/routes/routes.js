import home from '../views/pages/home';
import signUp from '../views/pages/sign-up';
import signOut from '../views/pages/sign-out';
import explore from '../views/pages/explore';
import profile from '../views/pages/profile';
import editProfile from '../views/pages/edit-profile';
import editProfilePicture from '../views/pages/edit-profile-picture';
import editPassword from '../views/pages/edit-password';
import post from '../views/pages/post';
import newPost from '../views/pages/new-post';
import editPost from '../views/pages/edit-post';
import searchUser from '../views/pages/search-user';
import searchPost from '../views/pages/search-post';

const routes = {
  '/': home,
  '/sign-up': signUp,
  '/sign-out': signOut,
  '/explore': explore,
  '/profile/verb': profile,
  '/edit-profile': editProfile,
  '/edit-profile-picture': editProfilePicture,
  '/edit-password': editPassword,
  '/post/verb': post,
  '/new-post': newPost,
  '/edit-post/verb': editPost,
  '/search-user': searchUser,
  '/search-user/verb': searchUser,
  '/search-post': searchPost,
  '/search-post/verb': searchPost,
};

export default routes;
