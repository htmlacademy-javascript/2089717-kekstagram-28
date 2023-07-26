const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const COMMENT_COUNT = 20;
const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'
];
const DESCRIPTION = [
  'Если смогу, я сделаю это.Конец истории.',
  'Смейтесь как только умеете, любите столько, сколько живете.',
  ' Помните: вы единственный человек, который может наполнить ваш мир солнечным светом.',
  'Я полностью уверена, что я — диснеевская принцесса, которую еще не придумали.',
  'Не позволяйте кому - то затушить ваши искры только потому, что их свет сияет в чьих - то глазах.',
  'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон.',
  'Улыбка — единственный тренд в моде, который актуален всегда.',
  'Никогда не ищите свое счастье там, где вы его однажды потеряли.',
  'Жизнь похожа на фотокамеру: вам просто нужно смотреть на нее с улыбкой.',
  'Моя жизнь меняется, потому что меняю ее я.',
  'Всегда начинайте свой день с хороших людей и кофе.',
  'Ни о чем не беспокойтесь.Потому что все лучшие умы на работе.',
  'Жизнь — это всего лишь серия крошечных чудес, поэтому обратите внимание на них.',
  'Живите во всех тех моментах, которые вы не можете выразить словами.',
  'Не ждите идеального момента.Берите каждый момент и делайте его идеальным.',
  'Признай это.Без меня, твоя жизнь была бы действительно скучной.',
  'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.',
  'Я пыталась заниматься йогой, но в позе лотоса уснула.',
  ' Я, возможно, никогда не буду лучшей, но я стараюсь быть лучшей твоей.',
  'Если вам никто не улыбнулся утром, я подарю вам одну из своих.',
  'Чем ярче светит солнце, тем меньше шансов увидеть тени жизни.',
  'Никогда не недооценивайте скрытую силу искренней улыбки.',
  'Наибольшие достижения всегда кажутся невозможными до тех пор, пока они не будут достигнуты.',
  'Жизнь продолжается. С тобой или без тебя.',
  'Я заранее извиняюсь за все, что говорю, когда я голоден.',
];
const NAMES = ['Олег', 'Руслан', 'Жанна', 'Снежанна', 'Василиса', 'Гриша', 'Коля', 'Оля', 'Армине', 'Георгий',
  'Петя', 'Света', 'Алина', 'Вася', 'Богдан', 'Вова'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Генерация массива из n-го количества УНИКАЛЬНЫХ чисел (id)
// const getUniqueIds = (idsCount) => {

const getRandomUniqueIntegers = (quantity, startInterval, endInterval) => {
  const randomIdList = [];
  for (let i = 0; randomIdList.length < quantity; i++) {
    let randomId = getRandomInteger(startInterval, endInterval);

    if (randomIdList.length == 0) {
      randomIdList.push(randomId);
      continue;
    }

    // Проверка на уникальность
    let isUnique = true;

    for (let j = 0; j < randomIdList.length; j++) {
      if (randomId == randomIdList[j]) {
        isUnique = false;
        break;
      }
    }

    // Если уникальное
    if (isUnique) {
      randomIdList.push(randomId);
    }
  }
  return randomIdList;
}

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};
const getUniqueMessages = () => {
  let firstSentence = getRandomArrayElement(COMMENT_LINES);
  let secondSentence = getRandomArrayElement(COMMENT_LINES);
  while (firstSentence === secondSentence) {
    secondSentence = getRandomArrayElement(COMMENT_LINES);
  };
  return firstSentence + secondSentence;
};
// console.log(getUniqueMessages());
let randomIdForComment = getRandomUniqueIntegers(20, 1, 20);



const getArrayUniqueComments = (commentsQuantity, startIntervalId, endIntervalId) => {
  const uniqueIds = getRandomUniqueIntegers(commentsQuantity, startIntervalId, endIntervalId);
  const arrayUniqueComments = uniqueIds.map((id) => {
    return {
      id: id,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getUniqueMessages(),
      name: getRandomArrayElement(NAMES)
    };
  });
  return arrayUniqueComments
};
console.log(getArrayUniqueComments(20, 100, 999));





// Функция генерации объекта описания фотографии

const photoDescription = () => {
  return {
    id: getRandomUniqueIntegers(PICTURE_COUNT, 1, PICTURE_COUNT),
    url: `photos/${getRandomUniqueIntegers(PICTURE_COUNT, 1, PICTURE_COUNT)}.jpg`,
  };
};
// console.log(photoDescription());



// Функция генерации массива описаний
const uniqueIdsandPhotos = getRandomUniqueIntegers(PICTURE_COUNT, 1, PICTURE_COUNT);
const arrayUniqueDescriptions = uniqueIdsandPhotos.map((id) => {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: getArrayUniqueComments(getRandomInteger(1, 20), 100, 999),
  };
})
console.log(JSON.stringify(arrayUniqueDescriptions));




