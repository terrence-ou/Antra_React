const numArr = [0, 1, 2, 3, 4, 5];
const strArr = ["alpha", "beta", "gamma", "theta"];

/* ============================================= */
/* myMap function simulates the Array.map method */
/* ============================================= */

Array.prototype.myMap = function (callback) {
  const newArr = new Array(this.length).fill(undefined);
  for (let i = 0; i < this.length; i++) {
    newArr[i] = callback ? callback(this[i], i) : this[i];
  }
  return newArr;
};

// Tests
console.log("\n========Testing `MyMap` method=========");
console.log("`myMap` results:");
console.log(numArr.myMap((val, index) => val + index));
console.log(strArr.myMap((str, index) => str[0].toUpperCase() + str.slice(1)));
console.log("Built-in `map` results:");
console.log(numArr.map((val, index) => val + index));
console.log(strArr.map((str, index) => str[0].toUpperCase() + str.slice(1)));

/* =================================================== */
/* myFilter function simulates the Array.filter method */
/* =================================================== */

Array.prototype.myFilter = function (callback) {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback && callback(this[i], i)) newArr.push(this[i]);
  }
  return newArr;
};
