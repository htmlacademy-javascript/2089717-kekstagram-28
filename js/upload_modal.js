import{updateModal} from './effects_filters.js';
import{hashtagsField} from './data.js';

const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const closeModalButton = document.querySelector('.img-upload__cancel');
const descriptionField = imgUploadOverlay.querySelector('.text__description');

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
  updateModal();
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

export {descriptionField, imgUploadOverlay, onDocumentKeydown};

