function validateNickname (value) {
  return value.length >= 2 && value.length <= 50;
}
console.log(validateNickname('l'));
