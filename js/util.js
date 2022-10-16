import { v4 as uuidv4 } from 'uuid';
import {messages, names, description} from './data.js';

function getRandomNumber(from, to) {
  if (from < 0 || to < from) {
    throw new Error('Некоректные входные данный');
  }

  return Math.floor(Math.random() * (to - from + 1) ) + from;
}

// eslint-disable-next-line no-unused-vars
function validCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

function getId() {
  return uuidv4();
}

function getRandomFromArr(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}

const getRandomComment = () => ({
  id: getId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomFromArr(messages),
  name: getRandomFromArr(names)
});

const getComments = (numberOfComments) => Array.from({length: numberOfComments}, () => getRandomComment());

const getPost = () => ({
  id: getId(),
  url: `photos/${getId()}.jpg`,
  description: getRandomFromArr(description),
  likes: getRandomNumber(15, 200),
  comments: getComments(getRandomNumber(1, 6))
});

const getPosts = (numberOfPosts) => Array.from({length: numberOfPosts}, () => getPost());

export {getPosts, getRandomNumber, validCommentLength, getRandomFromArr};
