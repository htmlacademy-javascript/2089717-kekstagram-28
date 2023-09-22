
const userModalElement = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const body = document.querySelector('body');
const socialCommentCount = document.querySelector('.current-comments-count');
const commentsLoader = document.querySelector('.comments-loader');
const socialFooter = document.querySelector('.social__footer');
const sendCommentButton = socialFooter.querySelector('.social__footer-btn');
const socialFooterInput = socialFooter.querySelector('.social__footer-text');
const socialPicture = socialFooter.querySelector('.social__picture');
const socialText = document.querySelector('.social__text');
const socialLikesImageContainer = document.querySelector('.social__likes-image-container');
const pathLikeImage = document.querySelector('path');


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

  userModalElement.classList.remove('hidden');
  const bigPictureWrapper = document.querySelector('.big-picture__img');
  const bigPictureImg = bigPictureWrapper.querySelector('img');
  bigPictureImg.src = pictureImg;
  const likesCount = document.querySelector('.likes-count');
  likesCount.textContent = pictureLikeCount;
  const commentsCount = document.querySelector('.comments-count');
  commentsCount.textContent = comments.length;
  const socialCaption = document.querySelector('.social__caption');
  socialCaption.textContent = description;
  socialComments.replaceChildren();

  const yourAvatar = socialComment.querySelector('img');

  const sendCommentOnClick = ()=> {
    if(!(socialFooterInput.value === '')) {
      socialText.textContent = socialFooterInput.value;
      socialFooterInput.value = '';
      yourAvatar.src = socialPicture.src;
      commentsCount.textContent = `${Number(commentsCount.textContent) + 1}`;
      socialCommentCount.textContent = `${Number(socialCommentCount.textContent) + 1}`;
      socialComments.appendChild(socialComment);
      socialComment.classList.add('new-comment');
    } else {
      socialFooterInput.classList.add('placeholder-style');
      socialFooterInput.placeholder = '!!!Введите сообщение перед отправкой!!!';
      socialFooterInput.style.border = '2px solid red';
      setTimeout(showCommonField, 1500);
    }
  };

  const sendCommentWithEnter = (evt)=> {
    if(evt.key === 'Enter') {
      evt.preventDefault();
      sendCommentOnClick();
    }
  };

  sendCommentButton.addEventListener('click', sendCommentOnClick);

  document.addEventListener('keydown', sendCommentWithEnter);

  function showCommonField () {
    socialFooterInput.classList.remove('placeholder-style');
    socialFooterInput.style.border = 'none';
    socialFooterInput.placeholder = 'Ваш комментарий...';
  }

  socialFooterInput.addEventListener('click', showCommonField);

  const hoverLikesRemoveEffects = () => {
    if(pathLikeImage.classList.contains('liked')) {
      pathLikeImage.style.stroke = '#e90000';
      pathLikeImage.style.fill = '#e90000';
      likesCount.style.color = '#e90000';
    } else {
      pathLikeImage.style.stroke = '#f48181';
      likesCount.style.color = '#f48181';
    }
  };

  const hoverLikesAddEffects = () => {
    if(pathLikeImage.classList.contains('liked')) {
      pathLikeImage.style.stroke = '#f48181';
      pathLikeImage.style.fill = '#f48181';
      likesCount.style.color = '#f48181';
    } else {
      pathLikeImage.style.stroke = '#e90000';
      likesCount.style.color = '#e90000';
    }
  };

  socialLikesImageContainer.addEventListener('mouseover', hoverLikesAddEffects);

  socialLikesImageContainer.addEventListener('mouseout', hoverLikesRemoveEffects);

  const makeLikedOnClick = () => {
    if(pathLikeImage.classList.contains('liked')) {
      pathLikeImage.classList.remove('liked');
      likesCount.textContent = `${Number(likesCount.textContent) - 1}`;
      pathLikeImage.style.fill = 'white';
    } else {
      pathLikeImage.style.stroke = '#e90000';
      pathLikeImage.style.fill = '#e90000';
      likesCount.textContent = `${Number(likesCount.textContent) + 1}`;
      likesCount.style.color = '#e90000';
      pathLikeImage.classList.add('liked');
    }
  };

  socialLikesImageContainer.addEventListener('click', makeLikedOnClick);

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
    sendCommentButton.removeEventListener('click', sendCommentOnClick);
    document.removeEventListener('keydown', sendCommentWithEnter);
    socialLikesImageContainer.removeEventListener('mouseover', hoverLikesAddEffects);
    socialLikesImageContainer.removeEventListener('mouseout', hoverLikesRemoveEffects);
    socialLikesImageContainer.removeEventListener('click', makeLikedOnClick);

  }

  for(let i = 0; i < comments.slice(0,5).length; i++) {
    const newComment = getNewComment(socialComment, comments[i]);
    socialComments.appendChild(newComment);
  }
  socialCommentCount.textContent = socialComments.children.length;

  function getNewFiveComments() {
    // socialComments.children.length.

    const currentCommentsArray = comments.slice(socialComments.children.length, socialComments.children.length + 5);
    for(let i = 0; i < currentCommentsArray.length; i++) {
      const newComment = getNewComment(socialComment, currentCommentsArray[i]);
      socialComments.appendChild(newComment);
      socialCommentCount.textContent = socialComments.children.length;
    }
  }

  commentsLoader.addEventListener('click', getNewFiveComments);

  body.classList.add('.modal-open');

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

export {addThumbnailClickHandler, body};


