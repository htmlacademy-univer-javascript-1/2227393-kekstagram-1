const COMMENTS_PAGE = 5;
const bigPicture = document.querySelector('.big-picture');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');

let commentsCounter;
let p;

function showComments(picture, count) {
  const similarCommentsFragment = document.createDocumentFragment();
  for (let i = commentsCounter; i < commentsCounter + count; i++) {
    const comment = picture.comments[i];
    const commentElement = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true);
    const commentPicture = commentElement.querySelector('.social__picture');

    commentPicture.src = comment.avatar;
    commentPicture.alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    similarCommentsFragment.appendChild(commentElement);
  }
  commentsContainer.appendChild(similarCommentsFragment);
  commentsCounter += count;
  bigPicture.querySelector('.number__comments-count').textContent = commentsCounter;
  if (picture.comments.length === commentsCounter) {commentsLoader.classList.add('hidden');}
}

function addCloseButton() {
  bigPicture.querySelector('#picture-cancel').addEventListener('click', (event) => {
    close(bigPicture, event);
  });
}

function addEscape() {
  const enEscEvent = (event) => {
    if (event.key === 'Escape') {
      close(bigPicture, event);
    }
  };

  document.addEventListener('keydown', enEscEvent, { once: true });
}

const loadComments = () => {
  showComments(p, Math.min(p.comments.length - commentsCounter, COMMENTS_PAGE));
};

function close() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', loadComments);
}

function show(picture) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length.toString();
  commentsContainer.querySelectorAll('.social__comment').forEach((comment) => comment.remove());
}

function toBigPicture(picture) {
  p = picture;
  commentsLoader.addEventListener('click', loadComments);
  show(picture);
  addCloseButton();
  addEscape();
  commentsCounter = 0;
  loadComments();
}

export {toBigPicture};
