// const finalData1 = json1.concat(json2);

// console.log(finalData1);

function concatArrays(...arrays) {
  return arrays.reduce((acc, currentArray) => acc.concat(currentArray), []);
}
const json1 = [
  { name: 1, test: 1 },
  { name: 2, test: 2 },
  { name: 3, test: 3 },
  { name: 4, test: 4 },
  { name: 5, test: 5 },
];

const json2 = [
  { name: 3, test: 6 },
  { name: 4, test: 7 },
  { name: 5, test: 8 },
  { name: 6, test: 9 },
  { name: 7, test: 10 },
];
const finalData1 = concatArrays(...arguments);

console.log(finalData1);
