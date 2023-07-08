import { collectionUniquePhotos } from './miniature.js';
import { arrayUniqueDescriptions } from './setup.js';

const userModalElement = document.querySelector('.big-picture');
const smallPictures = document.querySelectorAll('.picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const openPopupWithEsc = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    userModalElement.classList.add('hidden');
  }
};
const addThumbnailClickHandler = (smallPicture, dataObject) => {
  const {url:pictureImg, likes:pictureLikeCount, commentsQuantity:pictureCommentCount, description:description, comments: comments} = dataObject;
  smallPicture.addEventListener('click', () => {
    userModalElement.classList.remove('hidden');
    const bigPictureWrapper = document.querySelector('.big-picture__img');
    const bigPictureImg = bigPictureWrapper.querySelector('img');
    bigPictureImg.src = pictureImg;
    const likesCount = document.querySelector('.likes-count');
    likesCount.textContent = pictureLikeCount;
    const commentsCount = document.querySelector('.comments-count');
    commentsCount.textContent = pictureCommentCount;
    const socialCaption = document.querySelector('.social__caption');
    socialCaption.textContent = description;
    //генерация комментарий
    //генерация одного комментария
    const socialComments = document.querySelector('.social__comments');
    const socialComment = document.querySelector('.social__comment');
    const socialCommentPicture = socialComment.querySelector('img');
    const socialCommentText = socialComment.querySelector('p');
    for(let i = 0; i < comments.length; i++) {
      socialCommentPicture.src = comments[i].avatar;
      socialCommentPicture.alt = comments[i].name;
      socialCommentText.textContent = comments[i].message;
      const currentComment = socialComment.cloneNode(true);
      socialComments.appendChild(currentComment);
    }
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
  addThumbnailClickHandler(smallPictures[i], arrayUniqueDescriptions[i]);
}

