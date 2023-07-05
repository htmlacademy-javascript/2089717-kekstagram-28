import { collectionUniquePhotos } from './miniature.js';
import { arrayUniqueDescriptions } from './setup.js';

const userModalElement = document.querySelector('.big-picture');
const smallPictures = document.querySelectorAll('.picture');
const pictureLikesCount = document.querySelectorAll('.picture__likes');
const pictureCommentsCount = document.querySelectorAll('.picture__comments');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const pictureImges = document.querySelectorAll('.picture__img');
const openPopupWithEsc = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    userModalElement.classList.add('hidden');
  }
};
const addThumbnailClickHandler = (smallPicture, pictureImg, pictureLikeCount, pictureCommentCount) => {
  smallPicture.addEventListener('click', () => {
    userModalElement.classList.remove('hidden');
    const bigPictureWrapper = document.querySelector('.big-picture__img');
    const bigPictureImg = bigPictureWrapper.querySelector('img');
    bigPictureImg.src = pictureImg.src;
    const likesCount = document.querySelector('.likes-count');
    likesCount.textContent = pictureLikeCount.textContent;
    const commentsCount = document.querySelector('.comments-count');
    commentsCount.textContent = pictureCommentCount.textContent;
    const socialComment = document.querySelector('.social__comment');
    const socialCommentPicture = socialComment.querySelector('img');
    socialCommentPicture.src = 'img/avatar-5.svg';
    socialCommentPicture.alt = 'ыыыыыыыыы';
    const socialCommentText = socialComment.querySelector('p');
    socialCommentText.textContent = 'кек лол арбидол';
    const body = document.querySelector('body');
    body.classList.add('.modal-open');
    document.addEventListener('keydown', openPopupWithEsc);
  });
};
bigPictureCancel.addEventListener('click', () => {
  userModalElement.classList.add('hidden');
  document.removeEventListener('keydown', openPopupWithEsc);
});

for(let i = 0; i < smallPictures.length; i++) {
  addThumbnailClickHandler(smallPictures[i], pictureImges[i], pictureLikesCount[i], pictureCommentsCount[i]);
}

const picture = arrayUniqueDescriptions.find((item) => item.id === + smallPictures.dataset.miniatureId);
