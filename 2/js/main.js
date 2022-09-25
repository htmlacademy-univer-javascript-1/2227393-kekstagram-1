function getRandomNumber(from, to) {
  if (from < 0 || to < from) {
    throw new Error('Некоректные входные данный');
  }

  return Math.floor(Math.random() * (to - from + 1) ) + from;
}

function validCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

getRandomNumber(1, 10);
validCommentLength('Hello world', 11);

