const lab1 = require("./lab1");

console.log(lab1.questionOne([2])); 
// should return and output: {'3': true}
console.log(lab1.questionOne([5, 3, 10]));
// should return and output: { '2': true, '18': false, '93': false }
console.log(lab1.questionOne([-2, 3, -7]));
// should return and output: { '2': true, '3': true, '42': false }
console.log(lab1.questionOne([]));
// should return and output: {}
console.log(lab1.questionOne());
// should return and output: {}

console.log(lab1.questionTwo([1, 2, 3, 2, 1]));
//should return and output: [1, 2, 3]
console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1]));
//should return and output: [1]
console.log(lab1.questionTwo([1, '1', 1, '1', 2]));
//should return and output: [ 1, '1', 2 ]
console.log(lab1.questionTwo([3, 'a', 'b', 3, '1']));
//should return and output: [ 3, 'a', 'b', '1' ]
console.log(lab1.questionTwo([]));
//should return and output: []

console.log(lab1.questionThree(["bar", "car", "car", "arc"])); 
// should return and output: { acr: ["car", "arc"] }
console.log(lab1.questionThree(["bar", "car", "car", "arc", "arb", "rab"]));
// should return and output: { abr: [ 'bar', 'rab', 'arb' ], acr: [ 'car', 'arc' ] }
console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
// returns and outputs: { acer: ["race", "care"] } 
console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
// returns and outputs: {}
console.log(lab1.questionThree([])); 
// // returns and outputs: {}


console.log(lab1.questionFour(1, 3, 2)); 
// should return and output: 4
console.log(lab1.questionFour(4, 1, 1)); 
// should return and output: 13
console.log(lab1.questionFour(2, 5, 6)); 
//returns and outputs: 194
console.log(lab1.questionFour(8, 9, 7));
//returns and outputs: 51030
console.log(lab1.questionFour(-2, 1, 1));
//returns and outputs: 0 denominator error