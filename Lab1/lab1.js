const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let output = {};
    if(Array.isArray(arr)){
        let size = arr.length;
        let temp = 0;
        if(size > 0){
            for(let i=0; i<size; i++){
                arr[i] = (arr[i]*arr[i])-7;
                temp = Math.abs(arr[i]);
                if(primeNumber(temp)){
                    output[temp] = true;
                }
                else{
                    output[temp] = false;
                }
            }
        }
        return output;
    }
    return output;

}
function primeNumber(number){
    if(number===0)
        return false;
    if(number===1)
        return false;
    for(var i = 2; i <= number/2; i++){
        if(number%i===0)
            return false;
    }
    return true;
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    if(Array.isArray(arr)){
        let size = arr.length;
        let output = [];
        let index = 0;
        if(size > 0){
            for(let i=0; i<size; i++)
            {
                let flag = 0;
                for(let j=0; j<=i;j++)
                {
                    if(output[j]===arr[i]){
                        flag = 1;
                        break;
                    }
                }
                if(flag != 1){
                    output[index] = arr[i];
                    index++;
                }
            }
        }
        return output;
    }
}

const questionThree = function questionThree(arr) {
    // Implement question 3 here
    let output = {};
    if(Array.isArray(arr)){
        let size = arr.length;
        arr = arr.sort();
        for(let i=0; i<size; i++){
            if(arr[i] != -1){
                let key1 = arr[i].split('');
                key1 = key1.sort();
                key1 = key1.join('');
                let tempoutput = [];
                for(let j=i+1; j<size; j++){
                    if((arr[j] != -1) && (arr[i] != arr[j])){
                        let key2 = arr[j].split('');
                        key2 = key2.sort();
                        key2 = key2.join('');
                        if(key1 === key2)
                        {
                            if(!tempoutput.includes(arr[j])){
                                tempoutput.push(arr[j]);
                            }
                            arr[j] = -1;
                        }
                    }
                }
                if(!tempoutput.includes(arr[i])){
                    tempoutput.push(arr[i]);
                }
                if(tempoutput.length > 1){
                    output[key1] = tempoutput;
                } 
                arr[i] = -1;              
            }
        }
    }
    return output;
}

const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    let numerator = 0;
    let denominator = 0;
    numerator = factorial(num1)+factorial(num2)+factorial(num3);
    denominator = (num1+num2+num3)/3;

    if(denominator != 0){
        return Math.floor(numerator/denominator);
    }
    return "The average of the entered three numbers is 0."
}
function factorial(number){
    if(number == 0 || number ==1){
        return 1;
    }
    else if(number == -1){
        return -1;
    }
    else if(number < -1){
        return (number * factorial(number + 1));
    }
    else
        return (number * factorial(number - 1));
}

module.exports = {
    firstName: "RISHIKESH", 
    lastName: "YADAV", 
    studentId: "20007668",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};