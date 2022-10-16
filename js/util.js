import { v4 as uuidv4 } from 'uuid';

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

export {getRandomNumber, validCommentLength, getRandomFromArr, getId};
