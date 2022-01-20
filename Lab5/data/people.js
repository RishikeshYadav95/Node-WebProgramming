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

function checkId(str){
  const exp = new RegExp(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/);
  if(!exp.test(str)){
    throw `Id does not match the required pattern`
  }
}

async function getPersonById(id){
  checkArg(id, "Id input");
  checkIsString(id, "Id");
  checkSpaces(id, " Id");
  checkId(id);
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

  module.exports = {
    getPersonById,
    getPeople
  }