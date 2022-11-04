import {getPosts} from './data.js';

const NUMBER_OF_PICTURES = 25;

const generatedPictures = getPosts(NUMBER_OF_PICTURES);

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerTemplate = document.querySelector('.pictures');
const dFrag = document.createDocumentFragment();

generatedPictures.forEach((picture) => {
  const el = pictureTemplate.cloneNode(true);
  el.querySelector('.picture__img').src = picture.url;
  el.querySelector('.picture__likes').textContent = picture.likes;
  el.querySelector('.picture__comments').textContent = picture.comments.length;
  dFrag.appendChild(el);
});

picturesContainerTemplate.appendChild(dFrag);
