import { v4 as uuidv4 } from 'http://jspm.dev/uuid';

let prictureCounter = 0;

function getRandomNumber(from, to) {
  if (from < 0 || to < from) {
    throw new Error('Некоректные входные данный');
  }

  return Math.floor(Math.random() * (to - from + 1) ) + from;
}

function validCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

function getRandomFromArr(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}

function getId() {
  return uuidv4();
}

function getPictureId() {
  prictureCounter++;
  return prictureCounter;
}

export {getRandomNumber, validCommentLength, getRandomFromArr, getId, getPictureId};
