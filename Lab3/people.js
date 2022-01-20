const axios = require('axios');

async function getPeople(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
  }

//Function to check if argument exists
function checkArg(arg, variableName){
      if(!arg || arg == null){
          throw `${variableName || 'Argument'} is expected`;
      }
  }

//Function to check if argument is a string
function checkIsString(str, variableName){
    if (typeof str !== 'string') {
      throw `${variableName || 'Provided input'} is not a string`;
    }
}

//Function to check if argument is only spaces
function checkSpaces(str, variableName){
    if(str.split(" ").join("").length == 0){
        throw `You have entered only spaces for input${variableName || ''}`;
    }
}

/**
 * Required functions
 */

// Function to retrieve a person's details based on their Id
async function getPersonById(id){

    checkArg(id, "Id input");
    checkIsString(id, "Id");
    checkSpaces(id, " Id");
    const people = await getPeople();
    let output = {};
    for(key in people){
        if(people[key].id === id){
            output = people[key];
        }
    }

    if(Object.keys(output).length == 0){
        throw `Person not found`;
    }
    else
    {
        return output;
    }
}

// Function to retrieve list of people living or working on the given street
async function sameStreet(streetName, streetSuffix){

    checkArg(streetName, "StreetName");
    checkArg(streetSuffix, "StreetSuffix");
    checkIsString(streetName, "StreetName");
    checkIsString(streetSuffix, "StreetSuffix");
    checkSpaces(streetName, " StreetName");
    checkSpaces(streetSuffix, " StreetSuffix");
    const people = await getPeople();
    let output = [];
    let count = 0;
    for(key in people){
        if((people[key].address.home.street_name.toLowerCase() == streetName.toLowerCase() && people[key].address.home.street_suffix.toLowerCase() == streetSuffix.toLowerCase()) || (people[key].address.work.street_name.toLowerCase() == streetName.toLowerCase() && people[key].address.work.street_suffix.toLowerCase() == streetSuffix.toLowerCase())){
            output[count] = people[key];
            count++;
        }
    }
    
    if(count < 2 ){
        throw `No two people live or work on the given street`
    }
    else{
        return output;
    }
}

// Function to manipulate SSN values
async function manipulateSsn(){
    const people = await getPeople();
    let output = {};
    let highest = 0;
    let hobj = {};
    let lowest = 0;
    let lobj = {};
    let sum = 0;
    let count = 0;
    for(key in people){
        people[key].ssn = people[key].ssn.split("-").join("");
        people[key].ssn = people[key].ssn.split("").sort().join("");
        let ssn = parseInt(people[key].ssn);
        if(ssn<lowest || lowest == 0){
            lowest = ssn;
            lobj['firstName'] = people[key].first_name;
            lobj['lastName'] = people[key].last_name;
        }
        if(ssn>highest){
            highest = ssn;
            hobj['firstName'] = people[key].first_name;
            hobj['lastName'] = people[key].last_name;

        }
        sum =  sum + ssn;
        count++;
        
    }
    output['highest'] = hobj;
    output['lowest'] = lobj;
    output['average'] = Math.floor(sum/count);
    return output;
}

// Function to retrieve list of people with birthdays same as the given date
async function sameBirthday(month, day){
    
    checkArg(month, "Month");
    checkArg(day, "Day");
    if(typeof month != 'number' || typeof day != 'number'){
        month = parseInt(month);
        day = parseInt(day);
        if(isNaN(month) || isNaN(day)){
            throw `Month and Day have to be numbers`;
        }
    }
    if(0>=month || month>12){
        throw `Month > 12`;
    }
    if(day<=0){
        throw `Please enter a day within the valid range`;
    }
    switch (month) {
        case 1 : if(day>31){throw `There are not ${day} days in Jan`;}
                break;
        case 2 : if(day>28){throw `There are not ${day} days in Feb`;}
                break;
        case 3 : if(day>31){throw `There are not ${day} days in Mar`;}
                break;
        case 5 : if(day>31){throw `There are not ${day} days in May`;}
                break;
        case 7 : if(day>31){throw `There are not ${day} days in July`;}
                break;
        case 8 : if(day>31){throw `There are not ${day} days in Aug`;}
                break;
        case 10: if(day>31){throw `There are not ${day} days in Oct`;}
                break;
        case 12: if(day>31){throw `There are not ${day} days in Dec`;}
                break;
        case 4 : if(day>30){throw `There are not ${day} days in April`;}
                break;
        case 6 : if(day>30){throw `There are not ${day} days in June`;}
                break;
        case 9 : if(day>30){throw `There are not ${day} days in Sept`;}
                break;
        case 11: if(day>30){throw `There are not ${day} days in Nov`;}
                break;
    }
    const people = await getPeople();
    let output = [];
    let count = 0;
    for(key in people){
        let temp = people[key].date_of_birth;
        temp = temp.split("/");
        if (month == temp[0] && day == temp[1]){
            output[count] = people[key].first_name + " " + people[key].last_name;
            count++;
        }
    }
    if(count == 0){
        throw `No person found with the specified Birthday`;
    }
    else{
        return output;
    }
}

module.exports = {
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday
}