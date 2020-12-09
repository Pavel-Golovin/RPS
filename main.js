const field = document.querySelector('.search__input');
const dataList = document.querySelector('.search__autocomplete');
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

const renderAutoComplete = (repo) => {
  const [repoOwner, repoName, repoStars] = [...repo["full_name"].split("/"), repo["watchers"]];
  const newOption = document.createElement("option");
  newOption.value = repoName;
  newOption.dataset.owner = repoOwner;
  newOption.dataset.stars = repoStars;
  dataList.append(newOption);
  newOption.onclick()
}

const fieldInputHandler = (evt) => {
  if (lastTimeout) {
    clearTimeout(lastTimeout)
  }
  lastTimeout = setTimeout(async () => {
    const target = evt.target;
    const result = await getRepositories(target.value);
    dataList.innerHTML = "";
    result.forEach((repo) => renderAutoComplete(repo));
  }, 300)
}

field.addEventListener('input', fieldInputHandler);
