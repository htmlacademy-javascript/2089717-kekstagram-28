// //Функция генерация рандомного числа в промежутке от a до b
// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// //функция генерации массива массива рандомных чисел quantity- кол-во эле-тов массива, на промежжутке от startInterval до endInterval

// const getRandomUniqueIntegers = (quantity, startInterval, endInterval) => {
//   const randomIdList = [];
//   for (let i = 0; randomIdList.length < quantity; i++) {
//     const randomId = getRandomInteger(startInterval, endInterval);

//     if (randomIdList.length == 0) {
//       randomIdList.push(randomId);
//       continue;
//     }

//     // Проверка на уникальность
//     let isUnique = true;

//     for (let j = 0; j < randomIdList.length; j++) {
//       if (randomId == randomIdList[j]) {
//         isUnique = false;
//         break;
//       }
//     }

//     // Если уникальное
//     if (isUnique) {
//       randomIdList.push(randomId);
//     }
//   }
//   return randomIdList;
// };

// //функция получения случайного элемента из заданного массива

// const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// export { getRandomInteger, getRandomUniqueIntegers, getRandomArrayElement };
