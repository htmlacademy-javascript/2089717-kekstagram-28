// import { PICTURE_COUNT, MIN_LIKES_COUNT, MAX_LIKES_COUNT, COMMENT_LINES, DESCRIPTION, NAMES } from './data.js';

// import { getRandomInteger, getRandomUniqueIntegers, getRandomArrayElement } from './util.js';


// const getUniqueMessages = () => {
//   const firstSentence = getRandomArrayElement(COMMENT_LINES);
//   let secondSentence = getRandomArrayElement(COMMENT_LINES);
//   while (firstSentence === secondSentence) {
//     secondSentence = getRandomArrayElement(COMMENT_LINES);
//   }
//   return firstSentence + secondSentence;
// };
// // console.log(getUniqueMessages());
// // let randomIdForComment = getRandomUniqueIntegers(20, 1, 20);
// // Функция генерации массива комментариев
// const getArrayUniqueComments = (commentsQuantity, startIntervalId, endIntervalId) => {
//   const uniqueIds = getRandomUniqueIntegers(commentsQuantity, startIntervalId, endIntervalId);
//   const arrayUniqueComments = uniqueIds.map((id) => ({
//     id: id,
//     avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
//     message: getUniqueMessages(),
//     name: getRandomArrayElement(NAMES)
//   }));
//   return arrayUniqueComments;
// };
// // console.log(getArrayUniqueComments(getRandomInteger(1,20), 100, 999));

// // Функция генерации объекта описания фотографии

// // const photoDescription = () => {
// //   return {
// //     id: getRandomUniqueIntegers(PICTURE_COUNT, 1, PICTURE_COUNT),
// //     url: `photos/${getRandomUniqueIntegers(PICTURE_COUNT, 1, PICTURE_COUNT)}.jpg`,
// //   };
// // };
// // console.log(photoDescription());

// // Функция генерации массива описаний
// const uniqueIdsandPhotos = getRandomUniqueIntegers(PICTURE_COUNT, 1, PICTURE_COUNT);
// const arrayUniqueDescriptions = uniqueIdsandPhotos.map((id) => {

//   const comments = getArrayUniqueComments(getRandomInteger(1, 20), 100, 999);
//   return {
//     id: id,
//     url: `photos/${id}.jpg`,
//     description: getRandomArrayElement(DESCRIPTION),
//     likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
//     comments,
//     commentsQuantity: comments.length,
//   };
// });

// arrayUniqueDescriptions.sort((a, b) => a.id - b.id);
// export { arrayUniqueDescriptions };
