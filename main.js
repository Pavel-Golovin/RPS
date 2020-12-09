const field = document.querySelector('.search__input');
const dataList = document.querySelector('.search__repo-list');
const reposList = document.querySelector('.repo-container__list');
let lastTimeout;

const getRepositories = async (value) => {
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${value}`)
    const data = await response.json()
    return data.items.slice(0, 5);
  } catch (e) {
    return [];
  }
}

const newOptionClickHandler = (evt) => {
  const target = evt.target
  let newCard = document.createElement('li');
  newCard.classList.add('repo-container__item');
  let name = document.createElement('p');
  name.textContent = `Name: ${target.textContent}`;
  let owner = document.createElement('p');
  owner.textContent = `Owner: ${target.dataset.owner}`;
  let stars = document.createElement('p');
  stars.textContent = `Stars: ${target.dataset.stars}`;
  newCard.append(name);
  newCard.append(owner);
  newCard.append(stars);
  reposList.append(newCard);
  field.value = "";
  while (dataList.firstChild) {
    dataList.removeChild(dataList.firstChild);
  }
}

const renderAutoComplete = (repo) => {
  const [repoOwner, repoName, repoStars] = [...repo["full_name"].split("/"), repo["watchers"]];
  const newOption = document.createElement("li");
  newOption.classList.add("repo-list__item");
  newOption.innerHTML = repoName;
  newOption.dataset.owner = repoOwner;
  newOption.dataset.stars = repoStars;
  dataList.append(newOption);
  newOption.addEventListener("click", newOptionClickHandler);
}

const fieldInputHandler = (evt) => {
  if (lastTimeout) {
    clearTimeout(lastTimeout)
  }
  lastTimeout = setTimeout(async () => {
    const target = evt.target;
    const result = await getRepositories(target.value);
    while (dataList.firstChild) {
      dataList.removeChild(dataList.firstChild);
    }
    result.forEach((repo) => renderAutoComplete(repo));
  }, 300)
}

field.addEventListener('input', fieldInputHandler);
