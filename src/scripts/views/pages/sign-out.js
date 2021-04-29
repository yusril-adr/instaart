import Swal from 'sweetalert2';
import User from '../../data/user';

const signOut = {
  async render() {
    return '';
  },

  async afterRender(user) {
    try {
      if (user) {
        await User.signOut();

        const changeEvent = new CustomEvent('updateUser');
        return window.dispatchEvent(changeEvent);
      }

      window.location.hash = '#/';
      return;
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error',
      );
    }
  },
};

export default signOut;
