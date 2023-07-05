function User(name) {
  this.name = name;

  this.sayHi = function () {
    const lower = Math.ceil(Math.min(1, 10));
    const upper = Math.floor(Math.max(1, 10));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
  };
}

// var andrey = new User('Андрей');
// var kira = new User('Андрей');
// var jon = new User('Джон');

// andrey.sayHi();
// kira.sayHi();
// jon.sayHi();
let randomId = new User();
// console.log(randomId.sayHi());

for (let i = 0; i < 10; i++) {
  console.log(randomId.sayHi());
};