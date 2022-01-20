// Error handling funcions

//Check if argument is an object
function checkIsObject(obj, variableName){
    if(typeof obj !== 'object'){
        throw `${variableName || 'Provided input'} is not an object`;
    }else if(obj == null){
        throw `${variableName || 'Provided input'} is not an object`;
    }
}
//Check object size
function checkSize(obj){
    let size = 0;
    for(let key in obj){
        size++
    }
    return size;
}
//Check if input is a function
function checkFunction(func, variableName){
    if(typeof func !== 'function'){
        throw `${variableName || 'Provided input'} is not a function`;
    }
}
//Check if size of array is 0
function checkArraySize(arr){
    if(arr.length == 0){
        throw `You have entered an empty array of objects`;
    }
}
//Check if given argument is a number
function checkIsNumber(num){
    if (typeof num === 'number') {
      return true;
    }
    return false;
}

// Required functions

// Function to compute objects on given function
const computeObjects = function computeObjects([objects], func){
    let arr = arguments[0];
    checkFunction(func);
    checkArraySize(arr);
    let output = {}
    for(let i=0; i<arr.length; i++)
    {
        checkIsObject(arr[i]);
        let size = checkSize(arr[i]);
        if(size <= 0){
            throw `You have entered an empty array`;
        }
        for(let key in arr[i]){
            if(!checkIsNumber(arr[i][key]))
            {
                throw `Non number values are not accepted`
            }
            let value = func(arr[i][key]);
            if(output[key] == null){
                output[key] = value;
            }else{
                output[key] = output[key] + value;
            }
        }
    }
    return output;
}
// Function to get common keys from given objects
const commonKeys = function commonKeys(obj1, obj2){
    checkIsObject(obj1);
    checkIsObject(obj2);
    let output = {};
    let size1 = checkSize(obj1);
    if(size1 == 0){
        return output;
    }
    let size2 = checkSize(obj2);
    if(size2 == 0){
        return output;
    }
    for(let key1 in obj1){
        for(let key2 in obj2){
            if(typeof obj1[key1] == 'object' && typeof obj2[key2] == 'object'){
                let temp = {};
                temp = commonKeys(obj1[key1], obj2[key2]);
                let tempSize = checkSize(temp);
                if(tempSize > 0){
                    output[key1] = temp;
                }
            }
            else{
                if(key1 === key2 && obj1[key1] === obj2[key2])
                {
                    output[key1] = obj1[key1];                
                }
            }
        }
    }
    return output;
}
// Function to flip keys and values of given objects
const flipObject = function flipObject(object){
    checkIsObject(object);
    let size = checkSize(object);
    if(size <= 0){
        throw `You have entered an empty array`;
    }
    let output = {};
    let value;
    for(let key in object){
        if(typeof object[key] == 'object'){
            value = flipObject(object[key]);
            if(output[key] == null){
                output[key] = value;
            }else{
                output[key] = output[key] + value;
            }
        }else{
            value = object[key];
            if(output[value] == null){
                output[value] = key;
            }else{
                output[value] = output[value] + key;
            }
        }
    }
    return output;
}

module.exports = {
    computeObjects,
    commonKeys,
    flipObject
}