/* Register service worker to handle cache files */
registerServiceWorker = () => {
  //Return if browser does not support service worker
  if (!navigator.serviceWorker) return;

  //Register the service worker
  navigator.serviceWorker
    .register('sw.js')
    .catch((err) => {
      console.log('Service Worker Registeration failed', err);
    });
};

registerServiceWorker();
