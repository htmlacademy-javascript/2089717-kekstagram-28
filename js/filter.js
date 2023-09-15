
import { renderCollectionUniquePhotos } from './miniature.js';
import { addThumbnailClickHandler } from './popup.js';
// import {debounce} from './util.js';
const imgFiltersSection = document.querySelector('.img-filters');
const filterRandomButton = document.querySelector('#filter-random');
const filterDfaultButton = document.querySelector('#filter-default');
const filterDfaultDiscussed = document.querySelector('#filter-discussed');
const filterLiked = document.querySelector('#filter-liked');
const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = document.querySelectorAll('.img-filters__button');

imgFiltersSection.classList.remove('img-filters--inactive');

imgFiltersForm.addEventListener('click', (evt)=>{
  for(const imgFiltersButton of imgFiltersButtons) {
    imgFiltersButton.classList.remove('img-filters__button--active');
  }
  evt.target.classList.add('img-filters__button--active');

});

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getMixedArray = (array) => {
  const mixedArray = [];
  while(mixedArray.length < array.length) {
    const randomIndex = getRandomInteger(0,array.length - 1);
    if(!mixedArray.includes(array[randomIndex])) {
      mixedArray.push(array[randomIndex]);
    }
  }
  return mixedArray;
};

const clearPictures = () => {
  const picturesItems = document.querySelectorAll('.picture');
  for(const picturesItem of picturesItems) {
    picturesItem.remove();
  }
};

const addPictureClickHandler = (pictures) => {
  const smallPictures = document.querySelectorAll('.picture');
  for(let i = 0; i < smallPictures.length; i++) {
    addThumbnailClickHandler(smallPictures[i], pictures[i]);
  }
};


const getDefaultPicters = (pictures) => {
  filterDfaultButton.addEventListener('click', () => {
    clearPictures();
    renderCollectionUniquePhotos(pictures);
    addPictureClickHandler(pictures);
  });
};


const getRandomPictures = (pictures) => {
  filterRandomButton.addEventListener('click', () => {
    clearPictures();
    const randomPicrures = getMixedArray(pictures).slice(0,10);
    renderCollectionUniquePhotos(randomPicrures);
    addPictureClickHandler(randomPicrures);
  });
};

// const getRandomPicturesWithDelay = (pictures) => {
//   debounce(() => getRandomPictures(pictures), 2000);
// };


const getDiscussedPictures = (pictures) => {
  filterDfaultDiscussed.addEventListener('click', () => {
    clearPictures();
    const discussedPictures = pictures.slice().sort((a,b) => b.comments.length - a.comments.length);
    renderCollectionUniquePhotos(discussedPictures);
    addPictureClickHandler(discussedPictures);
  });
};

const getPopularPictures = (pictures) => {
  filterLiked.addEventListener('click', () => {
    clearPictures();
    const likedPictures = pictures.slice().sort((a,b) => b.likes - a.likes);
    renderCollectionUniquePhotos(likedPictures);
    addPictureClickHandler(likedPictures);
  });
};


export{imgFiltersSection,getMixedArray,filterRandomButton,getRandomPictures,getDefaultPicters,
  getDiscussedPictures,addPictureClickHandler,getPopularPictures,clearPictures};


