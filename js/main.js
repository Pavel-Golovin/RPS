'use strict';

(() => {

  const searchField = document.querySelector('.search__input');
  const dataList = document.querySelector('.search__repo-list');

  const clearAutocomplete = () => {
    window.utils.clearAllChildNodes(dataList);
  }

  const newOptionClickHandler = (repoData) => {
    window.renderRepoCard(repoData);
    window.utils.clearFieldValue(searchField);
    clearAutocomplete();
  }

  const renderAutocompleteItem = (repo) => {
    const repoData = window.utils.createRepoData(repo);
    const newOption = document.createElement("li");
    newOption.classList.add("repo-list__item");
    newOption.innerHTML = repoData.name;
    dataList.append(newOption);
    newOption.addEventListener("click", newOptionClickHandler.bind(null, repoData));
  }

  const renderAutocomplete = async (evt) => {
    const target = evt.target;
    const repos = await window.loadRepositories(target.value);
    repos.forEach((repo) => renderAutocompleteItem(repo));
  }

  const updateAutocomplete = async (evt) => {
    clearAutocomplete();
    await renderAutocomplete(evt);
  }

  const searchFieldInputHandler = (evt) => {
    window.debounce(updateAutocomplete, evt);
  }

  searchField.addEventListener('input', searchFieldInputHandler);

})();
