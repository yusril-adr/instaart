/* eslint-disable no-console */
const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Browser does\'nt support PWA feature.');
  }
};

export default swRegister;
