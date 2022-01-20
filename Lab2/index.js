const stringUtils = require("./stringUtils");
const arrayUtils = require("./arrayUtils");
const objUtils = require("./objUtils");

// //Test cases for stringUtils

// //Test cases for sortString
try{
    const sortStringOne = (stringUtils.sortString('123 FOO BAR! abbc'));
    console.log('sortString passed successfully');
}catch(e){
    console.error('sortString failed test case');
}
try{
    const sortStringTwo = (stringUtils.sortString('    '));
    console.error('sortString did not error');
}catch(e){
    console.log("sortString failed successfully");
}

//Test cases for replaceChar
try{
    const replaceCharOne = (stringUtils.replaceChar("Daddddy", 2));
    console.log('replaceChar passed successfully');
}catch(e){
    console.error('replaceChar failed test case');
}
try{
    const replaceCharTwo = (stringUtils.replaceChar(123));
    console.error('replaceChar did not error');
}catch(e){
    console.log("replaceChar failed successfully");
}

// //Test cases for mashUp
try{
    const mashUpOne = (stringUtils.mashUp("Rishikesh", "Yadav", "$"));
    console.log('mashUp passed successfully');
}catch(e){
    console.error('mashUp failed test case');
}
try{
    const mashUpTwo = (stringUtils.replaceChar(123));
    console.error('mashUp did not error');
}catch(e){
    console.log("mashUp failed successfully");
}

//Test cases for arrayUtils

//Test cases for average
try{
    const averageOne = (arrayUtils.average([[1], [2], [3]]));
    console.log('average passed successfully');
}catch(e){
    console.error('average failed test case');
}
try{
    const averageTwo = (arrayUtils.average([[1,3], ["hi",4,5]]));
    console.error('average did not error');
}catch(e){
    console.log("average failed successfully");
}

// // Test cases for modeSquared
try{
    const modeSquaredOne = (arrayUtils.modeSquared([1, 5, 2, 2, 5, 3, 3, 4, 4, 5]));
    console.log('modeSquared passed successfully');
}catch(e){
    console.log('modeSquared failed test case');
}
try{
    const modeSquaredTwo = (arrayUtils.modeSquared([]));
    console.error('modeSquared did not error');
}catch(e){
    console.log("modeSquared failed successfully");
}

// // Test cases for medianElement
try{
    const medianOne = (arrayUtils.medianElement([6, 6, 7]));
    console.log('medianElement passed successfully');
}catch(e){
    console.error('medianElement failed test case');
}
try{
    const medianTwo = (arrayUtils.medianElement([]));
    console.error('medianElement did not error');
}catch(e){
    console.log("medianElement failed successfully");
}

// Test cases for merge
try{
    const mergeOne = (arrayUtils.merge(['A', 2, 3, 'g'], [3, 'c', 1, 'Y', 2]));
    console.log('merge passed successfully');
}catch(e){
    console.error('merge failed test case');
}
try{
    const mergeTwo = (arrayUtils.merge([], ['ab', 'ts']));
    console.error('merge did not error');
}catch(e){
    console.log("merge failed successfully");
}

//Test cases for objUtils

// //Test cases for flipObject
try{
    const flipOne = (objUtils.flipObject({ a: 3, d: 3, b: 7, c: { x: 1 } }));
    console.log('flipObj passed successfully');
}catch(e){
    console.error('flipObj failed test case');
}
try{
    const flipTwo = (objUtils.flipObject({}));
    console.error('flipObj did not error');
}catch(e){
    console.log("flipObj failed successfully");
}

// //Test cases for computeObjects
try{
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    const computeOne = (objUtils.computeObjects([first, second, third], x => x + 2));
    console.log('computeObject passed successfully');
}catch(e){
    console.error('computeObject failed test case');
}
try{
    const computeTwo = (objUtils.computeObjects([first, second], x => x * 2));
    console.error('computeObjects did not error');
}catch(e){
    console.log("computeObjects failed successfully");
}

//Test cases for commonKeys
try{
    const first = {a: 2, b: 4};
    const second = {a: 5, b: 4};
    const third = {a: 2, b: {x: 7}};
    const fourth = {a: 3, b: {x: 7, y: 10}};
    const commonOne = (objUtils.commonKeys(third, fourth));
    console.log('commonKeys passed successfully');
}catch(e){
    console.error('commonKeys failed test case');
}
try{
    const commonTwo = (objUtils.commonKeys(second, third));
    console.error('commonKeys did not error');
}catch(e){
    console.log("commonKeys failed successfully");
}