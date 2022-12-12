import {validateComment, validateHashTags} from './util.js';
import '../nouislider/nouislider.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const uploader = document.querySelector('#upload-file');
const comment = imgUploadForm.querySelector('.text__description');
const hashtags = imgUploadForm.querySelector('.text__hashtags');
const scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
const effectsList = imgUploadOverlay.querySelector('.effects__list');
const effectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
const effectLevelSlider = imgUploadOverlay.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
const ZOOM_STEP = 25;
const ZOOM_MAX = 100;
const ZOOM_MIN = 0;
const ERROR_MSG = 'Форма не отправлена.';
const EFFECT_PREVIEW_PREFIX = 'effects__preview--';
const EFFECTS = {
  'effect-chrome': {
    effect: `${EFFECT_PREVIEW_PREFIX}chrome`,
    min: 0, max: 1, step: 0.1, start: 1,
    filter: (sliderValue) => `grayscale(${sliderValue})`
  },
  'effect-sepia': {
    effect: `${EFFECT_PREVIEW_PREFIX}sepia`,
    min: 0, max: 1, step: 0.1, start: 1,
    filter: (sliderValue) => `sepia(${sliderValue})`
  },
  'effect-marvin': {
    effect: `${EFFECT_PREVIEW_PREFIX}marvin`,
    min: 0, max: 100, step: 1, start: 100,
    filter: (sliderValue) => `invert(${sliderValue}%)`
  },
  'effect-phobos': {
    effect: `${EFFECT_PREVIEW_PREFIX}phobos`,
    min: 0, max: 3, step: 0.1, start: 3,
    filter: (sliderValue) => `blur(${sliderValue}px)`
  },
  'effect-heat': {
    effect: `${EFFECT_PREVIEW_PREFIX}heat`,
    min: 1, max: 3, step: 0.1, start: 3,
    filter: (sliderValue) => `brightness(${sliderValue})`
  }
};
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  successClass: 'img-upload__item--valid',
  errorClass: 'img-upload__item--invalid',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
  errorTextParent: 'img-upload__field-wrapper'
});

let currentEffect;

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
  imgUploadPreview.style.filter = '';
  imgUploadPreview.className = '';
  currentEffect = 'effect-none';
  imgUploadPreview.style.transform = 'scale(1)';
  effectLevel.classList.add('hidden');
  effectLevelSlider.noUiSlider.destroy();
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

function updSlider(min, max, step, start) {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step
  });
}

function setPictureEffect(evt) {
  currentEffect = evt.target.id;
  const effect = EFFECTS[currentEffect];
  if (typeof effect !== 'undefined') {
    updSlider(effect.min, effect.max, effect.step, effect.start);
  }
  if (currentEffect !== 'effect-none') {
    effectLevel.classList.remove('hidden');
    imgUploadPreview.className = effect;
  } else {
    effectLevel.classList.add('hidden');
    imgUploadPreview.className = '';
    imgUploadPreview.style.filter = '';
  }
}

function setEffect() {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  const effect = EFFECTS[currentEffect];
  if (typeof effect !== 'undefined') {
    imgUploadPreview.style.filter = effect.filter(sliderValue);
  }
}

const closeMessage = (message, showForm) => {
  document.body.removeChild(message);
  if (showForm) {
    imgUploadOverlay.classList.remove('hidden');
  }
};

function addCloseMessageEvents(message, showForm) {
  const button = message.querySelector('button');
  button.onclick = () => closeMessage(message, showForm);
  message.onclick = (e) => {
    if (e.target.className === 'error' || e.target.className === 'success') {
      closeMessage(message, showForm);
    }
  };
}

function getSuccessMessage() {
  const message = document.querySelector('#success').content.querySelector('section').cloneNode(true);
  document.body.appendChild(message);
  addCloseMessageEvents(message, false);
}

function getErrorMessage() {
  const message = document.querySelector('#error').content.querySelector('section').cloneNode(true);
  document.body.appendChild(message);
  addCloseMessageEvents(message, true);
}

const postSuccess = () => {
  closeForm();
  getSuccessMessage();
};

const postFail = () => {
  imgUploadOverlay.classList.add('hidden');
  getErrorMessage();
};

function zoom(out) {
  let currentSize = parseInt(scaleControlValue.value.replace('%', ''), 10);
  if (out === true && currentSize > ZOOM_STEP) {
    currentSize -= ZOOM_STEP;
  } else if (out === false && currentSize < ZOOM_MAX) {
    currentSize += ZOOM_STEP;
  }

  scaleControlValue.value = `${currentSize}%`;
  imgUploadPreview.style.transform = `scale(${currentSize / ZOOM_MAX})`;
}

function checkPhoto() {
  if (!uploader.files[0].type.startsWith('image/')) {return;}
  imgUploadPreview.src = URL.createObjectURL(uploader.files[0]);
}

uploader.addEventListener('change', () => {
  checkPhoto();
  imgUploadOverlay.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  scaleControlValue.value = '100%';
  scaleControlSmaller.addEventListener('click', () => zoom(true));
  scaleControlBigger.addEventListener('click', () => zoom(false));
  effectsList.addEventListener('change', setPictureEffect);
  noUiSlider.create(effectLevelSlider, {range: {min: ZOOM_MIN, max: ZOOM_MAX,}, start: ZOOM_MAX});
  effectLevelSlider.noUiSlider.on('update', () => {setEffect();});
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscEvent);
  imgUploadForm.querySelector('#upload-cancel').addEventListener('click', () => {
    document.removeEventListener('keydown', onEscEvent);
    closeForm();
  }, {once: true});
});

function post(onSuccess, onFail, body) {
  fetch('https://26.javascript.pages.academy/kekstagram', {method: 'POST', body},)
    .then((response) => {
      if (response.ok) {
        onSuccess();} else {
        onFail(ERROR_MSG);
      }
    })
    .catch(() => {
      onFail(ERROR_MSG);
    });
}


imgUploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!pristine.validate) {return;}
  document.removeEventListener('keydown', onEscEvent);
  post(postSuccess, postFail, new FormData(e.target));
});
