const connection = require('./config/mongoConnection');
const restaurants = require('./data/restaurants');
let idArray = [];
let index = 0;

async function main() {
    try{
        const saffronLounge = await restaurants.create("The Saffron Lounge1", "New York City, New York", "123-456-7890", "http://www.saffronlounge.com", "$$$$", ["Cuban", "Italian"], 3, {dineIn: true, takeOut: true, delivery: false});
        idArray[index] = saffronLounge._id.toString();
        index++;
        console.log(saffronLounge);
    }
    catch(e){
        console.log(e);
    }
    // try{
    //     const blackBear = await restaurants.create("Black Bear", "Hoboken, New Jersey", "456-789-0123", "http://www.blackbear.com", "$$", ["Cuban", "American" ], 4, {dineIn: true, takeOut: true, delivery: true});
    //     idArray[index] = blackBear._id.toString();
    //     index++;
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     console.log(await restaurants.getAll());
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     const pizzaLounge = await restaurants.create("Pizza Lounge", "New York City, New York", "999-999-9999", "http://www.pizzalounge.com", "$", ["Italian"], 5, {dineIn: false, takeOut: true, delivery: true});
    //     idArray[index] = pizzaLounge._id.toString();
    //     index++;
    //     console.log(pizzaLounge);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     const renamedSaffronLounge = await restaurants.rename(idArray[0], "http://www.thesaffronlounge.com"); 
    //     console.log(renamedSaffronLounge);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     const removeBlackBear = await restaurants.remove(idArray[1]);
    //     console.log(removeBlackBear);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     console.log(await restaurants.getAll());
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     const blackBear = await restaurants.create("Black Bear", "Hoboken, New Jersey", "456-789-0123", "http://www.ear.com", "$$", ["Cuban", "American" ], 4, {dineIn: true, takeOut: true, delivery: true});
    //     idArray[index] = blackBear._id.toString();
    //     index++;
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     const removeBlackBear = await restaurants.remove(idArray[1]);
    //     console.log(removeBlackBear);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     const renamedSaffronLounge = await restaurants.rename(idArray[1], "http://www.thesaffronlounge.com"); 
    //     console.log(renamedSaffronLounge);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     const renamedSaffronLounge = await restaurants.rename(idArray[0], "http://www.nge.com"); 
    //     console.log(renamedSaffronLounge);
    // }
    // catch(e){
    //     console.log(e);
    // }
    // try{
    //     console.log(await restaurants.get(idArray[1]));
    // }
    // catch(e){
    //     console.log(e);
    // }
    const db = await connection();
    await db.serverConfig.close();
}

main();