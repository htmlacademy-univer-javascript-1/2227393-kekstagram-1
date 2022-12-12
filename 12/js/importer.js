import {toBigPicture} from './big.js';
import {debounce, getRandomElementsFromArr} from './util.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerTemplate = document.querySelector('.pictures');
const imgFiltersForm = document.querySelector('.img-filters__form');
const dFrag = document.createDocumentFragment();
const RANDOM_PICTURES_SIZE = 10;

let importedData = [];

function renderData() {
  picturesContainerTemplate.querySelectorAll('.picture').forEach((picture) => picturesContainerTemplate.removeChild(picture));
  importedData.forEach((d) => {
    const clone = pictureTemplate.cloneNode(true);
    clone.querySelector('.picture__img').src = d.url;
    clone.querySelector('.picture__likes').textContent = d.likes;
    clone.querySelector('.picture__comments').textContent = d.comments.length;
    clone.addEventListener('click', () => {
      toBigPicture(d);
    });
    dFrag.appendChild(clone);
  });
  picturesContainerTemplate.appendChild(dFrag);
}

function generateError() {
  const error = document.querySelector('#error').content.querySelector('section').cloneNode(true);
  const button = error.querySelector('button');
  error.querySelector('h2').textContent = 'Ошибка при загрузке данных с сервера';
  button.textContent = 'Попробовать снова';
  button.addEventListener('click', () => location.reload(), {once: true});
  document.querySelector('body').append(error);
}

function clearImgFiltersForm() {
  const childNodes = imgFiltersForm.childNodes;
  childNodes.forEach((e) => {
    if (e.nodeType !== 3) {
      e.classList.remove('img-filters__button--active');
    }
  });
}

function generateData(data) {
  importedData = data;
  renderData();
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', (e) => {
    importedData = [...data];
    clearImgFiltersForm();
    e.target.classList.add('img-filters__button--active');
    switch (e.target.id) {
      case 'filter-random':
        importedData = getRandomElementsFromArr(importedData, RANDOM_PICTURES_SIZE);
        break;
      case 'filter-discussed':
        importedData.sort((p1, p2) => p2.comments.length - p1.comments.length);
        break;
    }
    debounce(() => renderData(), 500)();
  });
}

function importData(importUrl) {
  fetch(importUrl)
    .then((response) => response.json())
    .then((data) => {generateData(data);})
    .catch((e) => {generateError(e);});
}

export {importData};

