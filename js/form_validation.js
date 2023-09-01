//функция открытия шаблона для изменения картинки при её добавлени на страницу
const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const closeModalButton = document.querySelector('.img-upload__cancel');
const hashtagsField = imgUploadOverlay.querySelector('.text__hashtags');
const descriptionField = imgUploadOverlay.querySelector('.text__description');
const uploadform = document.querySelector('.img-upload__form');

// Показ Модального окна

const showModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('.modal-open');
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isOnFocus = () => document.activeElement === hashtagsField || document.activeElement === descriptionField;

function onDocumentKeydown(evt) {
  if(evt.key === 'Escape' && !isOnFocus()){
    evt.preventDefault();
    hideModal();
  }
}

imgUploadInput.addEventListener('change', showModal);
closeModalButton.addEventListener('click', hideModal);

//Валидация формы

const pristine = new Pristine(uploadform, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',

});

const VALID_SYMBOLS = new RegExp('^#[0-9а-яёa-z]{1,19}$', 'i');

function isValidTag(tag){
  return VALID_SYMBOLS.test(tag);
}

const getUniqueArray = (arr) => {
  const result = [];
  // eslint-disable-next-line
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
};

const getTagsArray = (string) => {
  if(string === '') {
    return true;
  }
  // eslint-disable-next-line
  const tags = string.split(' ');
  // eslint-disable-next-line
  for(let tag of tags) {
    if(!(isValidTag(tag))){
      return false;
    }
  }

  if(tags.length < 6 && (getUniqueArray(tags).join(' ')) === string) {
    return tags;
  }
};


pristine.addValidator(
  hashtagsField,
  getTagsArray,
  'Хештег введён некорректно'
);


const formValidation = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
};

uploadform.addEventListener('submit', formValidation);

//Наложение эффектов

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadContaner = document.querySelector('.img-upload__preview');
const uploadImage = imageUploadContaner.querySelector('img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsContainer = document.querySelector('.effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const EFFECTS = [
  {
    names: 'none',
    style: '  ',
    min: 0,
    max: 100,
    step: 1,
    unit: '',

  },
  {
    names: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',

  },
  {
    names: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',

  },
  {
    names: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',

  },
  {
    names: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',

  },
  {
    names: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',

  },
];

const DERAULT_EFFECT = EFFECTS[0];
// eslint-disable-next-line
let chosenEffect = DERAULT_EFFECT;

let scaleControlValueNumber = Number(scaleControlValue.value.split('').slice(0,length - 1).join(''));

uploadImage.style.transform = 'scale(1)';

scaleControlSmaller.addEventListener('click', () => {
  if(scaleControlValue.value !== '0%') {
    scaleControlValueNumber = scaleControlValueNumber - 25;
    scaleControlValue.value = `${scaleControlValueNumber}%`;
    uploadImage.style.transform = `scale(0.${scaleControlValueNumber})`;

  }
});

scaleControlBigger.addEventListener('click', () => {
  if(scaleControlValue.value !== '100%') {
    scaleControlValueNumber = scaleControlValueNumber + 25;
    scaleControlValue.value = `${scaleControlValueNumber}%`;
    uploadImage.style.transform = `scale(0.${scaleControlValueNumber})`;
    if(scaleControlValueNumber === 100){
      uploadImage.style.transform = 'scale(1)';
    }
  }
});

const isDefault = () => chosenEffect === DERAULT_EFFECT;

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const showDlider = () => {
  sliderContainer.classList.remove('hidden');
};


const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min:chosenEffect.min,
      max:chosenEffect.max,
    },
    start:chosenEffect.max,
    step: chosenEffect.step,
  });
  if(isDefault()){
    hideSlider();
    uploadImage.style.filter = '';
  } else {
    showDlider();
  }
};
effectLevelValue.value = 0;

const onEffectsChange = (evt) => {
  chosenEffect = EFFECTS.find((effect)=>evt.target.value === effect.names);
  uploadImage.classList.add(`effects__preview--${chosenEffect.value}`);
  updateSlider();
};

const onSliderUpdate = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  uploadImage.style.filter = `${chosenEffect.style}(${effectLevelValue.value}${chosenEffect.unit})`;
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min:DERAULT_EFFECT.min,
    max:DERAULT_EFFECT.max,
  },
  start:DERAULT_EFFECT.max,
  step: DERAULT_EFFECT.step,
  connect: 'lower',
});

if(isDefault()){
  hideSlider();
} else {
  showDlider();
}
// effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
// effectsContainer.addEventListener('change', onEffectsChange);

export{onSliderUpdate, onEffectsChange, getTagsArray, hashtagsField, effectLevelSlider, effectsContainer,
   uploadform, formValidation, pristine };
