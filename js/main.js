import { renderCollectionUniquePhotos } from './miniature.js';
import {addThumbnailClickHandler, smallPictures} from './popup.js';
import {onSliderUpdate, onEffectsChange, getTagsArray, hashtagsField,
  effectLevelSlider, effectsContainer, uploadform, formValidation, pristine} from './form_validation.js';

effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
effectsContainer.addEventListener('change', onEffectsChange);

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) =>response.json())
  .then((pictures) => {
    renderCollectionUniquePhotos(pictures);
    for(let i = 0; i < smallPictures.length; i++) {
      addThumbnailClickHandler(smallPictures[i], pictures[i]);
    }
  })
  .catch(()=>{
    console.log('не удалось найти источник');
  });


