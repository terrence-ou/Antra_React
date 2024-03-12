const numArr = [0, 1, 2, 3, 4, 5];
const strArr = ["alpha", "beta", "gamma", "theta"];

/* ======================================= */
/* myMap function simulates the map method */
/* ======================================= */

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

/* ============================================= */
/* myFilter function simulates the filter method */
/* ============================================= */

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

/* ============================================= */
/* myReduce function simulates the reduce method */
/* ============================================= */

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

/* =========================================== */
/* myEvery function simulates the every method */
/* =========================================== */

Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i)) return false;
  }
  return true;
};

console.log("\n========Testing `myEvery` method=========");
console.log("`myEvery` results:");
console.log(numArr.myEvery((num, index) => num + index > 0));
console.log(strArr.myEvery((str) => str.length > 3));

console.log("Built-in `every` results:");
console.log(numArr.every((num, index) => num + index > 0));
console.log(strArr.every((str) => str.length > 3));

/* ========================================= */
/* myFind function simulates the find method */
/* ========================================= */

Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i)) return this[i];
  }
  return undefined;
};

console.log("\n========Testing `myFind` method=========");
console.log("`myFind` results:");
console.log(numArr.myFind((num, index) => num * index > 10));
console.log(strArr.myFind((str) => str.length > 20));
console.log("Built-in `find` results:");
console.log(numArr.find((num, index) => num * index > 10));
console.log(strArr.find((str) => str.length > 20));

/* ================================================= */
/* myIncludes function simulates the includes method */
/* ================================================= */

Array.prototype.myIncludes = function (target) {
  const sameValueZero = (a, b) => {
    if (typeof a === "number" && typeof b === "number") {
      return a === b || (a !== a && b !== b); // x and y are equal , or x and y are both Nan
    }
    return a === b;
  };
  for (let i = 0; i < this.length; i++) {
    if (sameValueZero(this[i], target)) return true;
  }
  return false;
};

console.log("\n========Testing `myIncludes` method=========");
console.log("`myIncludes` results:");
console.log(numArr.myIncludes(4));
console.log(strArr.myIncludes("lambda"));
console.log("Built-in `includes` results:");
console.log(numArr.includes(4));
console.log(strArr.includes("lambda"));
