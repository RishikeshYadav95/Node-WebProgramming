console.log(`Hello World!`);

let addToNumber = (num)=>{
    let numToAdd=num;

    return (addThisMuch) =>{
        return numToAdd + addThisMuch;
    };
};

let addToTwelve = addToNumber(12);

console.log(addToTwelve);
console.log(addToTwelve(8));

function demoVarVsLet (){
    const whatDoICount = "odd";
    const howManyToCount = 12;

    if(whatDoICount === 'odd' || whatDoICount === 'both'){
        var count;

        for(let i=0; i<howManyToCount; i++){
            
        }
    };
    if(whatDoICount === 'even' || whatDoICount === 'both'){

    };
};