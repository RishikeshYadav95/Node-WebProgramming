const people = require("./people.js");
const stocks = require("./stocks.js");

async function main(){

    /*
    * Test cases for functions in people.js  
    */

    //getPersonById
    try{
        const peopledata = await people.getPersonById('b72ff10c-e540-4bd5-9b4f-69fc47de4b5d');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    //sameStreet
    try{
        const peopledata = await people.sameStreet("sutherland", "Point");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameStreet("sutherland", 9);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    //sameBirthday
    try{
        const peopledata = await people.sameBirthday(09, "25");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(4, "31");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    //manipulateSsn
    try{
        const peopledata = await people.manipulateSsn(4, "31");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    /*
    * Test cases for functions in stocks.js  
    */

    //listShareholders
    try{
        const stocksdata = await stocks.listShareholders();
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }

    //topShareholder
    try{
        const stocksdata = await stocks.topShareholder('Nuveen Floating Rate Income Fund');
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.topShareholder('Powell Industries, Inc.');
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }

    //listStocks
    try{
        const stocksdata = await stocks.listStocks("Fidel", "Crutch" );
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.listStocks("Rishikesh", "Yadav");
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.listStocks("  ", "Yadav");
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }

    //getStockById
    try{
        const stocksdata = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
}

//call main
main();