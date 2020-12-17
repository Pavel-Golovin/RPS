'use strict';

(() => {

  class RepoData {
    constructor(owner, name, stars) {
    this.name = name;
    this.owner = owner;
    this.stars = stars
    }
  }

  window.utils = {
    clearAllChildNodes: (parentNode) => {
      parentNode.innerHTML = "";
    },
    clearFieldValue: (field) => {
      field.value = "";
    },
    createRepoData: (repo) => {
      const data = [...repo["full_name"].split("/"), repo["watchers"]];
      return new RepoData(...data);
    }
  }

})();
