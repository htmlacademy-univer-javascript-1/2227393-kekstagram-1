function toBigPicture(picture) {
  const bigPicture = document.querySelector('.big-picture');

  fillData(picture, bigPicture);
  addCloseButton(bigPicture);
  addEscape(bigPicture);
}

function fillData(picture, bigPicture) {
  const commentsContainer = bigPicture.querySelector('.social__comments');
  const similarCommentsFragment = document.createDocumentFragment();

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length.toString();

  commentsContainer.querySelectorAll('.social__comment').forEach((comment) => comment.remove());

  picture.comments.forEach((comment) => {
    const commentElement = document.querySelector('#comment').content.querySelector('.social__comment').cloneNode(true);
    const commentPicture = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');

    commentPicture.src = comment.avatar;
    commentPicture.alt = comment.name;
    commentText.textContent = comment.message;
    similarCommentsFragment.appendChild(commentElement);
  });
  commentsContainer.appendChild(similarCommentsFragment);
  document.body.classList.add('.modal-open');
}

function addCloseButton(bigPicture) {
  bigPicture.querySelector('#picture-cancel').addEventListener('click', (event) => {
    close(bigPicture, event);
  });
}

function addEscape(bigPicture) {
  const onEscEvent = (event) => {
    if (event.key === 'Escape') {
      close(bigPicture, event);
      document.removeEventListener('keydown', onEscEvent);
    }
  };

  document.addEventListener('keydown', onEscEvent);
}

function close(bigPicture) {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('.modal-open');
}

export {toBigPicture};
