// import { create } from 'browser-sync';
import { arrayUniqueDescriptions } from './setup.js';

const userModalElement = document.querySelector('.big-picture');
const smallPictures = document.querySelectorAll('.picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const bigPictureSocial = document.querySelector('.big-picture__social');
const body = document.querySelector('body');
const socialCommentCount = document.querySelector('.social__comment-count ');
const commentsLoader = document.querySelector('.comments-loader');

// Кол-бэк функция для обработчика ESC (также предотвращает экспонинциальный рост комментов при закрытии)
const openPopupWithEsc = (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    userModalElement.classList.add('hidden');
    socialComments.replaceChildren();
    socialComments.appendChild(socialComment);
  }
};

const addThumbnailClickHandler = (smallPicture, dataObject) => {
  const {url:pictureImg, likes:pictureLikeCount, commentsQuantity:pictureCommentCount, description:description, comments: comments} = dataObject;
  smallPicture.addEventListener('click', () => {

    //Отрисовка данных о маленькой картинке в модальное окно

    console.log(comments);
    console.log(comments.slice(0,5));
    console.log(comments.slice(5,10));

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

    //Отрисовка 5-ти комментов

    let currentComment;
    const socialCommentPicture = socialComment.querySelector('img');
    const socialCommentText = socialComment.querySelector('p');

    for(let i = 0; i < comments.slice(0,5).length; i++) {
      socialCommentPicture.src = comments[i].avatar;
      socialCommentPicture.alt = comments[i].name;
      socialCommentText.textContent = comments[i].message;
      currentComment = socialComment.cloneNode(true);
      if(i === comments.slice(0,5).length - 1) {
        continue;
      }
      socialComments.appendChild(currentComment);
    }

    //Обработчик отрисовкки последующих 5-ти элементов при   клике "Загрузить ещё"

    commentsLoader.addEventListener('click', () => {
      const currentCommentsArray = comments.slice(5 ,10);
      for(let i = 0; i < currentCommentsArray.length; i++) {

        currentComment = socialComment.cloneNode(true);

        socialCommentPicture.src = currentCommentsArray[i].avatar;
        socialCommentPicture.alt = currentCommentsArray[i].name;
        socialCommentText.textContent = currentCommentsArray[i].message;

        socialComments.append(currentComment);

      }
    });


    body.classList.add('.modal-open');

    //Обработчик закрытия окна по кнопке ESC

    document.addEventListener('keydown', openPopupWithEsc);

    // if(comments.length === 1) {
    //   commentsCount = document.createElement('span');
    //   commentsCount.classList.add('comments-count');
    //   commentsCount.textContent = pictureCommentCount;
    //   socialCommentCount.textContent = `5 из ${commentsCount.textContent}`;
    // }
  });
};
//Обработчик закрытия окна по кнопке крестика (также предотвращает экспонинциальный рост комментов при закрытии)

bigPictureCancel.addEventListener('click', () => {
  userModalElement.classList.add('hidden');
  socialComments.replaceChildren();
  socialComments.appendChild(socialComment);
  document.removeEventListener('keydown', openPopupWithEsc);
  body.classList.remove('.modal-open');
  socialComment.classList.remove('hidden');
});

// Навешивание обработчиков на маленькие фото

for(let i = 0; i < smallPictures.length; i++) {
  addThumbnailClickHandler(smallPictures[i], arrayUniqueDescriptions[i]);
}

