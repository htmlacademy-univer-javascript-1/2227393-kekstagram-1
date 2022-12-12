import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

let pictureCounter = 0;

function getRandomNumber(from, to) {
  if (from < 0 || to < from) {
    throw new Error('Некорректные входные данный');
  }

  return Math.floor(Math.random() * (to - from + 1) ) + from;
}

function validateComment(comment) {
  return comment.length <= MAX_COMMENT_LENGTH;
}

function validateHashTags(s) {
  if (s === '') { return true; }
  s = s.toLowerCase().trim();
  const regExp = new RegExp(`#[A-Za-z0-9]{1,${MAX_HASHTAG_LENGTH-1}}$`);
  const hashtags = s.trim().split(new RegExp('[\\s\\t]+'));
  const uniqueHashtags = new Set(hashtags);
  for (const hashtag of hashtags) {
    if (!regExp.test(hashtag)) {
      return false;
    }
  }
  return hashtags.length === uniqueHashtags.size && hashtags.length <= MAX_HASHTAGS_COUNT;
}

function getRandomFromArr(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}

function getRandomElementsFromArr(array, n) {
  return array.sort(() => Math.random() - Math.random()).slice(0, n);
}

function getId() {
  return uuidv4();
}

function getPictureId() {
  pictureCounter++;
  return pictureCounter;
}

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {getRandomElementsFromArr, getRandomNumber, validateComment, validateHashTags, getRandomFromArr, getId, getPictureId, debounce};
