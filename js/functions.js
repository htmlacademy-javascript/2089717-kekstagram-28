// Функция 1
function checkStringLength(string, amount) {
  if (amount <= string.length) {
    return true;
  } else {
    return false;
  }
}

//Функция 2

function checkPalindrome(string) {
  if (string.split('').reverse().join('') === string) {
    return true;
  } else {
    return false;
  }
}

//Функция 3

function showNumber(string) {
  return parseInt(string);
}

//функция 4

function showSupplementedString(string, minLength, segment) {
  let wholeString = string;
  while (wholeString.length < minLength) {
    const newwholeStringLength = wholeString.length + segment.length;
    const currentSegment = newwholeStringLength <= minLength ? segment : segment.slice(0, minLength - newwholeStringLength);
    wholeString = currentSegment + wholeString;
  }
  return wholeString;
}

