import {hashtagsField} from './data.js';
import {showAndCloseWithSetTimeoutErrorPopup, sendFormData} from './fetch.js';

const uploadform = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadform, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',

});

// const makeFormValidate = () => {


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
// };

// makeFormValidate();

const formValidation = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if(isValid) {
    const uploadFormData = new FormData(evt.target);
    sendFormData(uploadFormData);
  } else{
    showAndCloseWithSetTimeoutErrorPopup();
  }
};


export{uploadform, formValidation, pristine};
