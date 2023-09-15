// function checkPalindrome(word) {
//   return (word.split('').reverse().join(''));
// }

// console.log(checkPalindrome('Анна'));
// // // Функция 1


// function checkStringLength(string, amount) {
//   if (amount <= string.length) {
//     return true;
//   } else {
//     return false;
//   }
// }
// console.log(checkStringLength('строка', 6))
// //Функция 2

// function checkPalindrome(string) {
//   if (string.split('').reverse().join('') === string) {
//     return true;
//   } else {
//     return false;
//   }
// }
// console.log(checkPalindrome('лол'))
// //Функция 3

// function showNumber(string) {
//   return parseInt(string);
// }

// //функция 4

// function showSupplementedString(string, minLength, segment) {
//   let wholeString = string;
//   while (wholeString.length < minLength) {
//     const newwholeStringLength = wholeString.length + segment.length;
//     const currentSegment = newwholeStringLength <= minLength ? segment : segment.slice(0, minLength - newwholeStringLength);
//     wholeString = currentSegment + wholeString;
//   }
//   return wholeString;
// }

//Функция 2

function showNumber(string) {
  if(Number(string)) {
    string = String(string);
  }
  const newString = string.split('');
  const numberString = [];
  for(let i = 0; i < newString.length; i++) {
    if(newString[i] >= 1 && newString[i] <= 9) {
      numberString.push(newString[i]);
    }
  }
  if (numberString.length === 0) {
    return NaN;
  } else {
    return Number(numberString.join(''));
  }
}
console.log(showNumber();

//Функция 3

// function showWholeString(string, minLength, segment) {
//   while()
//   return wholeString;
//  }


