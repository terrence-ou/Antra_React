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
console.log("\n========Testing `myMap` method=========");
console.log("`myMap` results:");
console.log(numArr.myMap((val, index) => val + index));
console.log(strArr.myMap((str) => str[0].toUpperCase() + str.slice(1)));
console.log("Built-in `map` results:");
console.log(numArr.map((val, index) => val + index));
console.log(strArr.map((str) => str[0].toUpperCase() + str.slice(1)));

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

// Tests
console.log("\n========Testing `myFilter` method=========");
console.log("`myFilter` results:");
console.log(numArr.myFilter((val, index) => val * index > 15));
console.log(strArr.myFilter((str) => str.length >= 5));
console.log("Built-in `filter` results:");
console.log(numArr.filter((val, index) => val * index > 15));
console.log(strArr.filter((str) => str.length >= 5));

/* =================================================== */
/* myReduce function simulates the Array.reduce method */
/* =================================================== */

Array.prototype.myReduce = function (callback, initVal) {
  let result = initVal;
  for (let i = 0; i < this.length; i++) {
    result = callback(result, this[i]);
  }
  return result;
};

console.log("\n========Testing `myReduce` method=========");
console.log("`myReduce` results:");
console.log(numArr.myReduce((acc_val, curr_val) => acc_val + curr_val, 0));
console.log(
  strArr.myReduce(
    (acc_val, curr_val) => acc_val.concat(Array(2).fill(curr_val)),
    []
  )
);
console.log("Built-in `reduce` results:");
console.log(numArr.reduce((acc_val, curr_val) => acc_val + curr_val, 0));
console.log(
  strArr.reduce(
    (acc_val, curr_val) => acc_val.concat(Array(2).fill(curr_val)),
    []
  )
);

/* myReduce function simulates the Array.reduce method */
