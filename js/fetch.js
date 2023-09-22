import { renderCollectionUniquePhotos } from './miniature.js';
import {showAlert} from './util.js';
import {imgUploadOverlay,onDocumentKeydown} from './upload_modal.js';
import {updateModal} from './effects_filters.js';
import {getDefaultPicters,getDiscussedPictures,addPictureClickHandler,getPopularPictures,getRandomPictures} from './filter.js';

const getData = () => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if(!response.ok){
        showAlert('Не удалось загрузить данные, обновите страницу');
      }
      return response.json();
    }
    )
    .then((pictures) => {
      renderCollectionUniquePhotos(pictures);
      addPictureClickHandler(pictures);
      getRandomPictures(pictures);
      getDefaultPicters(pictures);
      getDiscussedPictures(pictures);
      getPopularPictures(pictures);
    })
    .catch(()=>{
      showAlert('Не удалось загрузить данные, обновите страницу');
    });
};

const addClickHandlerForEroorOrSuccess = (button, modal) => {
  button.addEventListener('click', () => {
    modal.remove();
  });
};

const delayClose = (outContainer)=>{
  setTimeout(() => {
    outContainer.remove();
  }, 5000);
};

const addClickOutInnerHandler = (innerContainer, outContainer) => {
  document.addEventListener('click', (evt) => {
    if(!evt.composedPath().includes(innerContainer)) {
      outContainer.remove();
    }
  });
};

const closeNotificationOfUploadResultPopupWithEsc = (outContainer) => {

  const closeWithEsc = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      outContainer.remove();
      document.addEventListener('keydown', onDocumentKeydown);
    }
  };
  document.addEventListener('keydown', closeWithEsc);
  document.removeEventListener('keydown', onDocumentKeydown);
};

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

addClickHandlerForEroorOrSuccess(errorButton, errorUpload);
addClickHandlerForEroorOrSuccess(successButton, successUpload);

addClickOutInnerHandler(successInner,successUpload);
addClickOutInnerHandler(errorInner,errorUpload);

const showAndCloseWithSetTimeoutErrorPopup = () => {
  imgUploadOverlay.appendChild(errorUpload);
  delayClose(errorUpload);
  closeNotificationOfUploadResultPopupWithEsc(errorUpload);
};

const sendFormData = (FormData) => {

  fetch('https://28.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: FormData,
    })
    .then((response) => {
      if(response.ok) {
        updateModal();
        imgUploadOverlay.appendChild(successUpload);
        closeNotificationOfUploadResultPopupWithEsc(successUpload);
        delayClose(successUpload);
      } else{
        showAndCloseWithSetTimeoutErrorPopup();
      }
    })
    .catch(()=> {
      showAndCloseWithSetTimeoutErrorPopup();
    });
};


export {getData, showAndCloseWithSetTimeoutErrorPopup, sendFormData};

