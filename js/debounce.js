'use strict';

(() => {
  let lastTimeout;

  window.debounce = (callback, evt) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout)
    }
    lastTimeout = setTimeout(() => callback(evt), 300)
    }

})();
