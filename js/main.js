import {getData} from './fetch.js';
import {uploadForm, formValidation} from './form_validation.js';
import {onSliderUpdate, onEffectsChange, effectLevelSlider, effectsContainer} from './effects_filters.js';
import {} from './new-picture.js';

getData();

uploadForm.addEventListener('submit', formValidation);
effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
effectsContainer.addEventListener('change', onEffectsChange);
