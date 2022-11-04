import {getRandomNumber, getRandomFromArr, getId} from './util.js';

const DESCRIPTIONS = [
  'Лучшая фотография',
  'Ставим лайк, не проходим мимо',
  'Это котик',
  'Кто прочитал, тот поставил лайк',
  'Это фото сделано днем'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Антон', 'Дарт Вейдер', 'Гарри Поттер', 'Илон Маск', 'Джеси Пинкман', 'Уолтер Уайт', 'Тимон', 'Пумба', 'Влад'];

const getRandomComment = () => ({
  id: getId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomFromArr(MESSAGES),
  name: getRandomFromArr(NAMES)
});

const getComments = (numberOfComments) => Array.from({length: numberOfComments}, getRandomComment);

const getPost = () => ({
  id: getId(),
  url: `photos/${getId()}.jpg`,
  description: getRandomFromArr(DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comments: getComments(getRandomNumber(1, 6))
});

const getPosts = (numberOfPosts) => Array.from({length: numberOfPosts}, getPost);

export {getPosts};
