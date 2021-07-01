// links to DOM elements:
const refs = {
  input: document.querySelector('.userInput'),
  outputList: document.querySelector('.list'),
  add: document.querySelector('.addBtn'),
  sortName: document.querySelector('.sortNameBtn'),
  sortValue: document.querySelector('.sortValueBtn'),
  delete: document.querySelector('.deleteBtn'),
  xml: document.querySelector('.xmlBtn'),
};

//variables:
let textArr = [];
let textToDel = '';

//output window fill common function:
const showOutput = arr => {
  refs.outputList.innerHTML = '';

  for (let i = 0; i < arr.length; i += 1) {
    refs.outputList.insertAdjacentHTML('beforeend', `<li>${arr[i]}</li>`);
  }
};

//function for adding text from user input to output window:
const addText = e => {
  let userInput = refs.input.value.replaceAll(' ', '');

  const validInput = /^[a-zA-Z0-9]+$/;

  if (!userInput.includes('=')) {
    refs.input.value = '';
    return alert('please separate name and value with "="');
  }

  if (!userInput.replace('=', '').match(validInput)) {
    refs.input.value = '';
    return alert('sorry, you can use only latin letters or numbers. Try again');
  }

  textArr.push(userInput);
  showOutput(textArr);
  refs.input.value = '';
};

//function to find which text to delete:
const findeText = e => {
  textToDel = e.target.textContent;
};

//sorting by name function:
const sortByName = () => {
  textArr.sort();
  showOutput(textArr);
};

//sorting by value function:
const sortByValue = () => {
  //selecting only values:
  let newArr = textArr.map(el => {
    const index = el.indexOf('=') + 1;
    const newEl = el.slice(index);
    return newEl;
  });

  //new aray with sortet full elements:
  const sortedArr = newArr.sort().map(el => {
    const serchedElement = textArr.filter(item => {
      const index = item.indexOf('=') + 1;
      const newItem = item.slice(index);

      if (newItem == el) {
        return item;
      }
    });
    return (el = serchedElement[0]);
  });

  showOutput(sortedArr);
};

//deleting element function:
const deleteText = () => {
  const index = textArr.indexOf(textToDel);
  if (index > -1) {
    textArr.splice(index, 1);
  }
  showOutput(textArr);
};

const showXml = () => {
  console.log(refs.outputList.innerHTML);
  const xmlText = refs.outputList.innerHTML.replaceAll('li', 'element');
  refs.outputList.textContent = `<list> ${xmlText} </list>`;
};

//adding eventListeners to buttons:
refs.add.addEventListener('click', addText);
refs.outputList.addEventListener('click', findeText);
refs.sortName.addEventListener('click', sortByName);
refs.sortValue.addEventListener('click', sortByValue);
refs.delete.addEventListener('click', deleteText);
refs.xml.addEventListener('click', showXml);
