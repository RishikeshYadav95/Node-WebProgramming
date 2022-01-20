const axios = require('axios');

async function getStocks(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
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

async function getStockById(id){

    checkArg(id, "Id input");
    checkIsString(id, "Id");
    checkSpaces(id, " Id");
    checkId(id);
    const stocks = await getStocks();
    let output = {};
    for(key in stocks){
        if(stocks[key].id === id){
            output = stocks[key];
        }
    }

    if(Object.keys(output).length == 0){
        throw `Stocks not found`;
    }
    else
    {
        return output;
    }
}

module.exports = {
    getStockById,
    getStocks
  }