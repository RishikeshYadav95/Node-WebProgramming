// Error Handling functions

//Check if input is an array
function checkIsArray(arr){
    if (!Array.isArray(arr)) {
      throw `Provided input is not an array or array of arrays`;
    }
}
//Check if input is a number
function checkIsNumber(num, variableName){
    if (typeof num === 'number') {
      return true;
    }
    return false;
}
//Check if arguments exist
function argumentExits(arr){
    if(arr == null){
        throw `Please provide an array input`;
    }
}
//Check for empty arrays
function checkSize(arr){
    if(arr.length == 0){
        throw `You have entered an empty array for input`;
    }
}
//Check inner arrays for average function
function checkInnerArrays(arr){
        for(let i=0; i<arr.length; i++){
            argumentExits(arr[i]);
            checkIsArray(arr[i]);
            checkSize(arr[i]);
            for(let j=0; j<arr[i].length; j++){
                if(!checkIsNumber(arr[i][j])){
                    throw `Your array number ${i+1} has non number input`;
                }
            }
        }
}

// Required functions

// Function for average of array input
const average = function average(arr){
    argumentExits(arr);
    checkIsArray(arr);
    checkSize(arr);
    checkInnerArrays(arr);
    let sum = 0;
    let num = 0;
    for(let i=0; i<arr.length; i++){
        num = num + arr[i].length;
        for(let j=0; j<arr[i].length; j++){
            sum = sum+arr[i][j];
        }
    }

    return Math.round(sum/num);

}
// Function for getting square of mode of array input
const modeSquared = function modeSquared(arr){
    argumentExits(arr);
    checkIsArray(arr);
    checkSize(arr);
    for(let i=0; i<arr.length; i++){
        if(!checkIsNumber(arr[i])){
            throw `All elements in the input array must be numbers`;
        }
    }
    arr.sort();
    let modeCount = 1;
    let mode = 0;
    for(let i=0; i<arr.length;){
        let j = i+1;
        let count = 0;
        for(j;arr[i]==arr[j];j++){
                count++;
        }
        if(modeCount < count){
            mode = 0;
            mode = (arr[i]*arr[i]);
        }
        if(modeCount == count){
            mode = mode + (arr[i]*arr[i]);
        }
        modeCount = count;
        i = j;
    }
    return mode;

}
// Function for getting median of array input
const medianElement = function medianElement(arr){
    argumentExits(arr);
    checkIsArray(arr);
    checkSize(arr);
    let output = {};
    for(let i=0; i<arr.length; i++)
    {
        if(!checkIsNumber(arr[i])){
            throw `Element ${i+1} in the input array is not a number`;
        }
    }
    arr = arr.sort();
    let index = Math.floor(arr.length/2);
    let i = arr.length%2;
    let median = 0;
    if(i == 1){
        median = arr[index];
    }
    else if(i == 0){
        median = (arr[index-1]+arr[index])/2;
    }
    for(let i=0; i<index; i++){
        if(arr[i] == median){
            index = i;
        }
    }
    output[median] = index;
    return output;

}
// Function for merging the array inputs
const merge = function merge(arrayOne, arrayTwo){
    argumentExits(arrayOne);
    argumentExits(arrayTwo);
    checkIsArray(arrayOne);
    checkIsArray(arrayTwo);
    checkSize(arrayOne);
    checkSize(arrayTwo);
    let output = [];
    let count = 0;
    for(let i =0; i<arrayOne.length; i++){
        let a = arrayOne[i];
        if(typeof a != 'number'){
            if(typeof a != 'string'){
                throw `The elements of first array can either be numbers or characters`;
            }
            else if(a.length != 1 || (a !== a.toUpperCase() && a !== a.toLowerCase())){
                throw `The elements of first array can either be numbers or alphabets`;
            }
        }
        output[count] = a;
        count++;
    }
    for(let i =0; i<arrayTwo.length; i++){
        let a = arrayTwo[i];
        if(typeof a != 'number'){
            if(typeof a != 'string'){
                throw `The elements of second array can either be numbers or characters`;
            }
            else if(a.length != 1 || (a !== a.toUpperCase() && a !== a.toLowerCase())){
                throw `The elements of second array can either be numbers or alphabets`;
            }
        }
        output[count] = a;
        count++
    }
    output = output.join("");
    output = output.split("").sort().join("");
    let index = 0;
    while(47<output.charCodeAt(index) && output.charCodeAt(index)<58){
        index++;
    }
    let num = output.substring(0,index);
    output = output.substring(index);
    index = 0;
    while(64<output.charCodeAt(index) && output.charCodeAt(index)<91){
        index++;
    }
    let upper = output.substring(0, index);
    output = output.substring(index);
    output = output.concat(upper);
    output = output.concat(num);
    return output;

}

module.exports = {
    average,
    modeSquared,
    medianElement,
    merge
}