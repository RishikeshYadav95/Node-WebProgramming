const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;

/**
 * ---------------------
 * Validation Functions 
 * ---------------------
 */
function checkIsString(str, variableName){
    if (typeof str !== 'string') {
      throw `${variableName || 'Provided input'} is not a string`;
    }
}
function checkIsObject(obj, variableName){
    if(typeof obj !== 'object'){
        throw `${variableName || 'Provided input'} is not an object`;
    }else if(obj == null){
        throw `${variableName || 'Provided input'} is not an object`;
    }
}
function checkSpaces(str, variableName){
    if(str.split(" ").join("").length == 0){
        throw `You have entered only spaces for input${variableName || ''}`;
    }
}
function checkPhoneNumber(phoneNumber){
    const exp = new RegExp(/^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/);
    if(!exp.test(phoneNumber)){
        throw `Phone number does not match the required pattern of xxx-xxx-xxxx`
    }
}
function checkWebsite(website){
    if(website.substring(0,11) != "http://www." || website.substring(website.length-4, website.length) != ".com" || website.substring(11, website.length-4).length < 5){
        throw `Given website does not match the criteria`;
    }
}
function checkPriceRange(priceRange){
    if(priceRange != "$" && priceRange != "$$" && priceRange != "$$$" && priceRange != "$$$$"){
        throw `Entered price range isnt valid`;
    }
}
function checkCuisine(arr){
    if (!Array.isArray(arr)) {
      throw `Provide an array of cuisines`;
    }
    else if(arr.length == 0){
        throw `Atleast one cuisine needs to be provided`
    }
    else{
        for(let i = 0; i<arr.length; i++){
            checkIsString(arr[i]);
            checkSpaces(arr[i]);
        }
    }
}
function checkService(serviceOptions){
    checkIsObject(serviceOptions);
    let count = 0;
    for (key in serviceOptions){
        count++;
    }
    if(count != 3){
        throw `Please enter valid service options`;
    }
    if(typeof serviceOptions['dineIn'] != 'boolean' || typeof serviceOptions['takeOut'] != 'boolean' || typeof serviceOptions['delivery'] != 'boolean'){
        throw `Please enter valid service options`;
    }
}
function checkID(id){
    checkIsString(id);
    checkSpaces(id);
    const restaurantId = require('mongodb').ObjectID;
    if(!restaurantId.isValid(id)){
        throw `Please provide a valid id`;
    }
    return new restaurantId(id);

}

/**
 * --------------------
 * Required Functions
 * --------------------
 */

//Function to create a dB entry
async function create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions){
    if(!name || !location || !phoneNumber || !website || !priceRange || !cuisines || !overallRating || !serviceOptions){
        throw `All fields need to have valid values`;
    }
    checkIsString(name); checkIsString(location); checkIsString(phoneNumber); checkIsString(website); checkIsString(priceRange);
    checkSpaces(name); checkSpaces(location); checkSpaces(phoneNumber); checkSpaces(website); checkSpaces(priceRange);
    checkPhoneNumber(phoneNumber);
    checkWebsite(website);
    checkPriceRange(priceRange);
    checkCuisine(cuisines);
    checkService(serviceOptions);
    const restaurantCollection = await restaurants();

    let newRestaurant = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: overallRating,
        serviceOptions: serviceOptions
    }
    const insertInfo = await restaurantCollection.insertOne(newRestaurant);
    if (insertInfo.insertedCount === 0) throw 'Could not add restaurant';
    const newId = insertInfo.insertedId;
    const restaurant = await this.get(newId.toString());
    return restaurant;
}

//Function to fetch a dB entry based on given id
async function get(id) {
    if (!id) throw 'You must provide an id to search for';
    let resId = checkID(id);
    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({ _id: resId });
    if (restaurant === null){
        throw 'No restaurant with that id';
    }
    restaurant['_id'] = restaurant._id.toString();
    return restaurant;
  }

//Function to fetch all dB entries
async function getAll(){
    const restaurantCollection = await restaurants();
    const restaurantList = await restaurantCollection.find({}).toArray();
    for(let i=0; i<restaurantList.length;i++){
        restaurantList[i]['_id'] = restaurantList[i]._id.toString();
    }
    return restaurantList;
}

//Function to delete a dB entry based on given id
async function remove(id){
    if (!id){
        throw 'You must provide an id to search for';
    }
    let resId = checkID(id);

    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({ _id: resId });
    if (restaurant === null){
        throw 'No restaurant with that id';
    }
    else{
        let restaurantName = restaurant.name;
        const deletionInfo = await restaurantCollection.deleteOne({ _id: resId });
        if (deletionInfo.deletedCount === 0) {
        throw `Could not delete restaurant with id of ${id}`;
        }
        return `${restaurantName} has been successfully deleted!`;
    }
}

//Function to update the given field of a dB entry based on given id
async function rename(id, newWebsite) {
    if (!id){
        throw 'You must provide an id to search for';
    }
    let resId = checkID(id);
    if (!newWebsite){
        throw 'You must provide a website';
    }
    checkWebsite(newWebsite);

    const restaurantCollection = await restaurants();
    const updatedRestaurant = {
      website: newWebsite
    };

    const updatedInfo = await restaurantCollection.updateOne(
      { _id: resId },
      { $set: updatedRestaurant }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'Either no restaurant was found for the provided Id or the website entered already exits in db';
    }
    return await this.get(id);
  }

module.exports = {
    create,
    get,
    getAll,
    remove,
    rename
}