const axios = require('axios');

async function getPeople(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
}

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

//Function to retrieve a person's' details based on the Id provided
async function returnName(people, id){
    let output = {};
    if(id != null)
    {
        for(index in people){
            if(people[index].id === id){
                return people[index];
            }
        }
    }
    return "No person found";
}

/**
 * Required functions
 */

// Function to retrieve all share holders' details based on their Id
async function listShareholders(){
    const stocks = await getStocks();
    const people = await getPeople();
    for(key in stocks){
        if(stocks[key].shareholders.length != 0){
            let array = stocks[key].shareholders;
            for(let i = 0; i<array.length; i++){
                let id = array[i].userId;
                let name = await returnName(people, id);
                delete array[i].userId;
                array[i]['first_name'] = name.first_name;
                array[i]['last_name'] = name.last_name;
                }
            stocks[key].shareholders = array;
        }
    }
    //return JSON.stringify(stocks);
    return stocks;
}

// Function to retrieve the details of the top share holder for the given stock name
async function topShareholder(stockName){
    checkArg(stockName, "StockName input");
    checkIsString(stockName, "StockName");
    checkSpaces(stockName, " StockName");
    const stocks = await getStocks();
    const people = await getPeople();
    let output = "";
    for(key in stocks){
        if(stocks[key].stock_name === stockName){
            let array = stocks[key].shareholders;
            if(array.length >0){
                let snum = 0;
                let count = 0;
                for(let i =0; i<array.length; i++){
                    if(array[i].number_of_shares > snum){
                        snum = array[i].number_of_shares;
                        count = i;
                    }
                }
                let name = await returnName(people, array[count].userId);
                output = "With " + snum + " shares in " + stockName + ", " + name.first_name + " " + name.last_name + " is the top shareholder.";
            }
            else{
                output = stockName + " currently has no shareholders.";
            }
        }
    }
    if(output == ""){
        throw `StockName not found`
    }
    return output;
}

// Function to retrieve the details of shares owned by the given person
async function listStocks(firstName, lastName){

    checkArg(firstName, "FirstName");
    checkArg(lastName, "LastName");
    checkIsString(firstName, "FirstName");
    checkIsString(lastName, "LastName");
    checkSpaces(firstName, " FirstName");
    checkSpaces(lastName, " LastName");
    const stocks = await getStocks();
    const people = await getPeople();
    let output = [];
    let count = 0;
    for(key in people){
        if(people[key].first_name == firstName && people[key].last_name == lastName){
            let id = people[key].id;
            for(key1 in stocks){
                let array = stocks[key1].shareholders;
                if(array.length > 0){
                    for(let i = 0; i< array.length; i++){
                        if(array[i].userId == id){
                            let obj = {};
                            obj['stock_name'] = stocks[key1].stock_name;
                            obj['number_of_shares'] = array[i].number_of_shares;
                            output[count] = obj;
                            count++;
                            break;
                        }
                    }
                }
            }
            if(output.length == 0){
                throw `The entered person does not own shares in even one company`;
            }
            break;
        }
    }
    if(output.length == 0){
        throw `The entered person does not exist in people.json`;
    }
    return output;
}

// Function to retrieve all share holders' details based on their Id
async function getStockById(id){

    checkArg(id, "Id input");
    checkIsString(id, "Id");
    checkSpaces(id, " Id");
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
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
}