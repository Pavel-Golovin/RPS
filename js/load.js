'use strict';

(() => {

  window.loadRepositories = async (value) => {
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${value}`)
      const data = await response.json()
      return data.items.slice(0, 5);
    } catch (e) {
      return [];
    }
  }

})();
