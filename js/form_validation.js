import{hashtagsField,
  descriptionField, imgUploadOverlay, onDocumentKeydown} from './upload_modal.js';
const uploadform = document.querySelector('.img-upload__form');

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
const effectsLabel = document.querySelector('.effects__label');


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


const makeScaleControlSmaller = () => {
  if(scaleControlValue.value !== '0%') {
    scaleControlValueNumber = scaleControlValueNumber - 25;
    scaleControlValue.value = `${scaleControlValueNumber}%`;
    uploadImage.style.transform = `scale(0.${scaleControlValueNumber})`;

  }
};

const makeScaleControlBigger = () => {
  if(scaleControlValue.value !== '100%') {
    scaleControlValueNumber = scaleControlValueNumber + 25;
    scaleControlValue.value = `${scaleControlValueNumber}%`;
    uploadImage.style.transform = `scale(0.${scaleControlValueNumber})`;
    if(scaleControlValueNumber === 100){
      uploadImage.style.transform = 'scale(1)';
    }
  }
};

scaleControlSmaller.addEventListener('click', makeScaleControlSmaller);
scaleControlBigger.addEventListener('click', makeScaleControlBigger);

const isDefault = () => chosenEffect === DERAULT_EFFECT;

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const showDlider = () => {
  sliderContainer.classList.remove('hidden');
};


function updateSlider() {
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
}
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


const makeScaleControlStandart = () => {
  if(scaleControlValue.value !== '100%') {
    scaleControlValueNumber = 100;
    scaleControlValue.value = `${scaleControlValueNumber}%`;
    uploadImage.style.transform = 'scale(1)';
  }
};

const makeNoneStyle = () => {
  chosenEffect = DERAULT_EFFECT;
  uploadImage.classList.add(`effects__preview--${chosenEffect.value}`);
  effectsLabel.focus();
};

function updateModal(){
  makeNoneStyle();
  updateSlider();
  hashtagsField.value = '';
  descriptionField.value = '';
  makeScaleControlStandart();
}


const successUpload = document
  .querySelector('#success')
  .content.querySelector('.success');
const successButton = successUpload.querySelector('.success__button');
const successInner = successUpload.querySelector('.success__inner');

const errorUpload = document
  .querySelector('#error')
  .content.querySelector('.error');
const errorButton = errorUpload.querySelector('.error__button');
const errorInner = errorUpload.querySelector('.error__inner');

successButton.addEventListener('click', () => {
  successUpload.remove();
});

const closeSuccessPopupWithEsc = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    successUpload.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

document.addEventListener('click', (evt) => {
  if(!evt.composedPath().includes(successInner)) {
    successUpload.remove();
  }
});

errorButton.addEventListener('click', () => {
  errorUpload.remove();
});

document.addEventListener('click', (evt) => {
  if(!evt.composedPath().includes(errorInner)) {
    errorUpload.remove();
  }
});

const delayClose = (outContainer)=>{
  setTimeout(() => {
    outContainer.remove();
  }, 5000);
};

const showAndCloseWithSetTimeoutErrorPopup = () => {
  imgUploadOverlay.appendChild(errorUpload);
  delayClose(errorUpload);
};

const formValidation = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if(isValid) {
    const uploadFormData = new FormData(evt.target);
    fetch('https://28.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: uploadFormData,
      })
      .then((response) => {
        if(response.ok) {
          updateModal();
          imgUploadOverlay.appendChild(successUpload);
          imgUploadOverlay.addEventListener('keydown', closeSuccessPopupWithEsc);
          delayClose(successUpload);
          // console.log(imgUploadOverlay.children.length);
          // if(includes(successUpload)) {
          //   console.log('areg');
          // }
        } else{
          showAndCloseWithSetTimeoutErrorPopup();
        }
      })
      .catch(()=> {
        showAndCloseWithSetTimeoutErrorPopup();
      });
  } else{
    showAndCloseWithSetTimeoutErrorPopup();
  }
};

uploadform.addEventListener('submit', formValidation);
export {onSliderUpdate, onEffectsChange, effectLevelSlider, effectsContainer, formValidation};

