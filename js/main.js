import {getData} from './fetch.js';
import {hideModal, showModal, imgUploadInput, closeModalButton} from './upload_modal.js';
import {onSliderUpdate, onEffectsChange, effectLevelSlider, effectsContainer} from './form_validation.js';

getData();
imgUploadInput.addEventListener('change', showModal);
closeModalButton.addEventListener('click', hideModal);

effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
effectsContainer.addEventListener('change', onEffectsChange);
