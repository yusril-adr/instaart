import User from '../../data/user.js';

const signOut = {
  async render() {
    return '';
  },

  async afterRender(user) {
    try {
      if(user) {
        await User.signOut();

        const changeEvent = new CustomEvent('signInOrOut');
        return window.dispatchEvent(changeEvent);
      } 
      
      location.hash = '#/';
    } catch (error) {
      await Swal.fire(
        'Oops ...',
        error.message,
        'error'
      )
    }
  },
};

export default signOut;
