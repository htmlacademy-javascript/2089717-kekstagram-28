import { renderCollectionUniquePhotos } from './miniature.js';
import {addThumbnailClickHandler} from './popup.js';
import {showAlert} from './util.js';

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
    // debugger;
      renderCollectionUniquePhotos(pictures);
      const smallPictures = document.querySelectorAll('.picture');
      for(let i = 0; i < smallPictures.length; i++) {
        addThumbnailClickHandler(smallPictures[i], pictures[i]);
      }
    })
    .catch(()=>{
      showAlert('Не удалось загрузить данные, обновите страницу');
    });
};

export {getData};

