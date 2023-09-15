// import {onSliderUpdate, onEffectsChange, effectLevelSlider, effectsContainer, updateModal}
import {descriptionField} from './upload_modal.js';
import {hashtagsField} from './data.js';
import {pristine} from './form_validation.js';

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
  pristine.reset();
}

export {onSliderUpdate, onEffectsChange, effectLevelSlider, effectsContainer, updateModal};
