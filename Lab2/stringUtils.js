// Error handling funcions

//Function to check if argument is a string
function checkIsString(str, variableName){
    if (typeof str !== 'string') {
      throw `${variableName || 'Provided input'} is not a string`;
    }
}
//Function to check if argument exists or not
function argumentExits(str, variableName){
    if(str == null){
        throw `String input is expected${variableName || ''}`;
    }
}
//Function to check if argument is only spaces
function checkSpaces(str, variableName){
    if(str.split(" ").join("").length == 0){
        throw `You have entered only spaces for input${variableName || ''}`;
    }
}
//Function to check length of string
function checkLength(str, variableName){
    if(str.length <= 0){
        throw `You have entered an empty string in ${variableName || 'input'}!`;
    }
}

// Required functions

// Function to get sorted string
const sortString = function sortString(string){
    argumentExits(string);
    checkIsString(string, 'Given input');
    if(string.length <= 0){
        throw `You have entered an empty string!`;
    }
    checkSpaces(string);

    string = string.split("").sort().join("");
    let index = 0;
    let index2 = 0;
    while(string.charCodeAt(index)<65)
    {
        index++;
    }
    let substringA = string.substring(0, index);
    string = string.substring(index);
    if(substringA != null){
        index = 0;
        while(substringA.charCodeAt(index)<33){
            index++
        }
    }
    let substringB = substringA.substring(0,index);
    substringA = substringA.substring(index);
    substringA = substringA.concat(substringB);
    string = string.concat(substringA);

    return string;
}
// Function to replace a specified index character
const replaceChar = function replaceChar(string, idx){
    argumentExits(string);
    checkIsString(string, 'Given input');
    checkLength(string, "input String");
    checkSpaces(string, " String");
    argumentExits(idx);
    if(idx == null){
        throw `Index parameter is required.`;
    }
    if(typeof idx != 'number' || idx <=0 || idx > (string.length-2))
    {
        throw `The entered index parameter is not valid with the provided String length.`;
    }
    let char1 = string[idx-1];
    let char2 = string[idx+1];
    let flag = true;
    string = string.split("");
    for(let i=0; i<string.length; i++){
        if(string[i] == string[idx] && i != idx){
            if(flag){
                string[i] = char1;
                flag = false;
            }
            else
            {
                string[i] = char2;
                flag = true;
            }
        }
    }
    string = string.join("");
    return string;
    
}
// Function to mash up two strings
const mashUp = function mashUp(string1, string2, char){
    argumentExits(string1, "for String1");
    argumentExits(string2, "for String2");
    argumentExits(char, "for char argument");
    checkIsString(string1, "String 1");
    checkIsString(string2, 'String 2');
    checkIsString(char, 'Char argument');
    checkSpaces(string1, " String 1");
    checkSpaces(string2, " String 2");
    checkSpaces(char, " Char");
    checkLength(string1,"String 1");
    checkLength(string2,"String 1");
    checkLength(char,"Char");

    let length = 0;
    let flag = false;
    let mash = "";
    if(string1.length >= string2.length){
        length = string1.length;
        flag = true;
    }
    else{
        length = string2.length
    }
    
    for(let i=0; i<length;i++){
        if(flag){
            mash = mash.concat(string1[i]);
            if(string2[i] != null){
                mash = mash.concat(string2[i]);
            }
            else{
                mash = mash.concat(char);
            }
        }
        else{
            if(string1[i] != null){
                mash = mash.concat(string1[i]);
            }
            else{
                mash = mash.concat(char);
            }
            mash = mash.concat(string2[i]);
        }
    }
    return mash;
}

module.exports = {
    sortString,
    replaceChar,
    mashUp
}