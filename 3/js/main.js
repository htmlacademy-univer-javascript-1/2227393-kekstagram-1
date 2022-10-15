const description = [
  'Лучшая фотография',
  'Ставим лайк, не проходим мимо',
  'Это котик',
  'Кто прочитал, тот поставил лайк',
  'Это фото сделано днем'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Антон', 'Дарт Вейдер', 'Гарри Поттер', 'Илон Маск', 'Джеси Пинкман', 'Уолтер Уайт', 'Тимон', 'Пумба', 'Влад'];
const numberOfPosts = 25;

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
function getId() {
  // eslint-disable-next-line no-undef
  const { v4: uuidv4 } = require('uuid');
  return uuidv4();
}

// eslint-disable-next-line no-unused-vars
function getRandomFromArr(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}

// eslint-disable-next-line no-unused-vars
const getRandomComment = () => ({
  id: getId(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomFromArr(messages),
  name: getRandomFromArr(names)
});

// eslint-disable-next-line no-unused-vars
const getComments = () => Array.from({length: getRandomNumber(1, 6)}, () => getRandomComment());

// eslint-disable-next-line no-unused-vars
const getPost = () => ({
  id: getId(),
  url: `photos/${getId()}.jpg`,
  description: getRandomFromArr(description),
  likes: getRandomNumber(15, 200),
  comments: getComments()
});

const getPosts = () => Array.from({length: numberOfPosts}, () => getPost());

// eslint-disable-next-line no-console
console.log(getPosts());

