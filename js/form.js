import {validateComment, validateHashTags} from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const uploader = document.querySelector('#upload-file');
const comment = imgUploadForm.querySelector('.text__description');
const hashtags = imgUploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  successClass: 'img-upload__item--valid',
  errorClass: 'img-upload__item--invalid',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(comment, validateComment, 'Длина комментария не может составлять больше 140 символов.');
pristine.addValidator(hashtags, validateHashTags, 'Максимальное число хэш-тегов - 5. Максимальная длина хэш-тега - 20 символов. Хэш-теги должны быть уникальны.');

function resetSelectedFile() {
  imgUploadPreview.src = '';
  uploader.value = null;
}

function cancelEsc(e) {
  if (e.key === 'Escape') {e.stopPropagation();}
}

function closeForm() {
  document.body.classList.remove('.modal-open');
  imgUploadOverlay.classList.add('hidden');
  resetSelectedFile();
  imgUploadForm.reset();
  pristine.reset();
}

comment.onkeydown = cancelEsc;
hashtags.onkeydown = cancelEsc;

const onEscEvent = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    document.removeEventListener('keydown', onEscEvent);
    closeForm();
  }
};

imgUploadForm.querySelector('#upload-cancel').addEventListener('click', () => {
  document.removeEventListener('keydown', onEscEvent);
  closeForm();
}, {once: true});

imgUploadForm.addEventListener('submit', (e) => {
  if (!pristine.validate()) {e.preventDefault();}
  document.removeEventListener('keydown', onEscEvent);
});

uploader.addEventListener('change', () => {
  if (!uploader.files[0].type.startsWith('image/')) {return;}
  imgUploadPreview.src = URL.createObjectURL(uploader.files[0]);
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscEvent);
});
