'use strict';

(() => {

  const reposList = document.querySelector('.cards__list');
  const cardTemplate = document.querySelector('#cardTemplate')
      .content
      .querySelector('.card');

  const cardCloseBtnClickHandler = (evt) => {
    let target = evt.target;
    target.parentElement.remove();
  }

  window.renderRepoCard = (repo) => {
    const repoCardElement = cardTemplate.cloneNode(true);
    const cardNameElement = repoCardElement.querySelector('.card__name');
    const cardOwnerElement = repoCardElement.querySelector('.card__owner');
    const cardStarsElement = repoCardElement.querySelector('.card__stars');
    const cardCloseBtn = repoCardElement.querySelector('.card__close-btn');
    cardNameElement.textContent = `Name: ${repo.name}`;
    cardOwnerElement.textContent = `Owner: ${repo.owner}`;
    cardStarsElement.textContent = `Stars: ${repo.stars}`;
    reposList.appendChild(repoCardElement);
    cardCloseBtn.addEventListener('click', cardCloseBtnClickHandler);
  }

})();
