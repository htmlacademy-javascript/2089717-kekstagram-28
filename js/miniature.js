import { arrayUniqueDescriptions } from './setup.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const picturesListFragment = document.createDocumentFragment();
const picturesList = document.querySelector('.pictures');

const collectionUniquePhotos = arrayUniqueDescriptions.forEach(
  ({ url, commentsQuantity, likes, description, id}) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    const pictureImg = pictureItem.querySelector('.picture__img');
    pictureImg.src = url;
    pictureImg.alt = description;
    const pictureComments = pictureItem.querySelector('.picture__comments');
    pictureComments.textContent = commentsQuantity;
    const pictureLikes = pictureItem.querySelector('.picture__likes');
    pictureLikes.textContent = likes;
    picturesListFragment.appendChild(pictureItem);
    pictureItem.dataset.miniatureId = id;
  }
);

picturesList.appendChild(picturesListFragment);

export { collectionUniquePhotos };
