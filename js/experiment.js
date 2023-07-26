const getRandomUniqueMessage = (Messagearray) => {
  let message = {
    firstSentence: getRandomArrayElement(Messagearray),
    secondSentence: getRandomArrayElement(Messagearray)
  };
  if (firstSentence === secondSentence) {
    message.secondSentence = getRandomArrayElement(Messagearray);
  }
  return message;
}
console.log()