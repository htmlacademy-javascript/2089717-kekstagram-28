// import { create } from 'browser-sync';
// import { arrayUniqueDescriptions } from './setup.js';

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

const getNewComment = (commentSample, currentCommentData) => {
  const currentComment = commentSample.cloneNode(true);
  const currentCommentPicture = currentComment.querySelector('img');
  const currentCommentText = currentComment.querySelector('p');
  currentCommentPicture.src = currentCommentData.avatar;
  currentCommentPicture.alt = currentCommentData.name;
  currentCommentText.textContent = currentCommentData.message;
  return currentComment;
};


const openPopup = (dataObject) => {
  const {url:pictureImg, likes:pictureLikeCount, description:description, comments: comments} = dataObject;

  // commentsQuantity:pictureCommentCount,
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
  // const commentsCount = document.querySelector('.comments-count');
  // commentsCount.textContent = pictureCommentCount;
  const socialCaption = document.querySelector('.social__caption');
  socialCaption.textContent = description;
  socialComments.replaceChildren();

  const closePopupWithEsc = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();

    }
  };

  function closePopup(){
    userModalElement.classList.add('hidden');
    socialComments.replaceChildren();
    document.removeEventListener('keydown', closePopupWithEsc);
    body.classList.remove('.modal-open');
    socialComment.classList.remove('hidden');
    commentsLoader.removeEventListener('click', getNewFiveComments);
  }
  //Отрисовка 5-ти комментов


  for(let i = 0; i < comments.slice(0,5).length; i++) {
    const newComment = getNewComment(socialComment, comments[i]);
    socialComments.appendChild(newComment);
  }

  //Обработчик отрисовкки последующих 5-ти элементов при   клике "Загрузить ещё"

  function getNewFiveComments() {
    console.log('Количество отрендеренных комментов - ',socialComments.children.length);
    // socialComments.children.length
    const currentCommentsArray = comments.slice(socialComments.children.length, socialComments.children.length + 5);
    for(let i = 0; i < currentCommentsArray.length; i++) {
      const newComment = getNewComment(socialComment, currentCommentsArray[i]);
      console.log(newComment);
      socialComments.appendChild(newComment);
    }
  }

  commentsLoader.addEventListener('click', getNewFiveComments);

  body.classList.add('.modal-open');

  //Обработчик закрытия окна по кнопке ESC

  document.addEventListener('keydown', closePopupWithEsc);

  const closePopupByButton = () => {
    closePopup();
  };

  bigPictureCancel.addEventListener('click', closePopupByButton);
  return getNewFiveComments;
};

const addThumbnailClickHandler = (smallPicture, dataObject) => {
  smallPicture.addEventListener('click', () => openPopup(dataObject));
};
//Обработчик закрытия окна по кнопке крестика (также предотвращает экспонинциальный рост комментов при закрытии)


// Навешивание обработчиков на маленькие фото


export {addThumbnailClickHandler, smallPictures};


