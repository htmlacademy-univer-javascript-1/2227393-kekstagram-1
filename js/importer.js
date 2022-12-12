import {toBigPicture} from './big.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerTemplate = document.querySelector('.pictures');
const dFrag = document.createDocumentFragment();

function renderData(data) {
  data.forEach((d) => {
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

function importData(importUrl) {
  fetch(importUrl)
    .then((response) => response.json())
    .then((data) => {renderData(data);})
    .catch((e) => {generateError(e);});
}

export {importData};

