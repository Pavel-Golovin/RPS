'use strict';

const field = document.querySelector('.search__input');
const dataList = document.querySelector('.search__repo-list');
const reposList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#cardTemplate')
    .content
    .querySelector('.card');
let lastTimeout;

const clearAllChildNodes = (parentNode) => {
  parentNode.innerHTML = "";
}

const cardCloseBtnClickHandler = (evt) => {
  let target = evt.target;
  target.parentElement.remove();
}

const renderRepoCard = (data) => {
  const repoCardElement = cardTemplate.cloneNode(true);
  const cardNameElement = repoCardElement.querySelector('.card__name');
  const cardOwnerElement = repoCardElement.querySelector('.card__owner');
  const cardStarsElement = repoCardElement.querySelector('.card__stars');
  const cardCloseBtn = repoCardElement.querySelector('.card__close-btn');
  cardNameElement.textContent = `Name: ${data.name}`;
  cardOwnerElement.textContent = `Owner: ${data.owner}`;
  cardStarsElement.textContent = `Stars: ${data.stars}`;
  reposList.appendChild(repoCardElement);
  cardCloseBtn.addEventListener('click', cardCloseBtnClickHandler);
}

const renderAutocompleteItem = (repo) => {
  const [repoOwner, repoName, repoStars] = [...repo["full_name"].split("/"), repo["watchers"]];
  const newOption = document.createElement("li");
  newOption.classList.add("repo-list__item");
  newOption.innerHTML = repoName;
  dataList.append(newOption);
  const dataObj = {
    name: repoName,
    owner: repoOwner,
    stars: repoStars
  }
  newOption.addEventListener("click", (evt) => {
    const target = evt.target
    renderRepoCard(dataObj);
    field.value = "";
    clearAllChildNodes(dataList);
  });
}

const renderAutocomplete = async (evt) => {
  const target = evt.target;
  const repos = await window.loadRepositories(target.value);
  repos.forEach((repo) => renderAutocompleteItem(repo));
}

const updateAutocomplete = async (evt) => {
  clearAllChildNodes(dataList);
  await renderAutocomplete(evt);
}

const debounce = (callback, evt) => {
  if (lastTimeout) {
    clearTimeout(lastTimeout)
  }
  lastTimeout = setTimeout(() => callback(evt), 300)
}

const fieldInputHandler = (evt) => {
  debounce(updateAutocomplete, evt);
}

field.addEventListener('input', fieldInputHandler);
