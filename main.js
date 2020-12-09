const field = document.querySelector('.search__input');

const debounce = (fn, debounceTime) => {
  let isDebounced;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(isDebounced);
    isDebounced = setTimeout(()=>fn.apply(context, args), debounceTime);
  }
}

const getRepositories = async (value) => {
  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=${value}`)
    const data = await response.json()
    return data.items.slice(0, 5);
  } catch (e) {
    return [];
  }
}

const fieldInputHandler = async (evt) => {
  const target = evt.target;
  const result = await getRepositories(target.value);
  console.log(result)
}

field.addEventListener('input', fieldInputHandler);
