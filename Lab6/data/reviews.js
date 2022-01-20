const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const restaurant = require('./restaurants');
const ObjectId = require('mongodb').ObjectID;

function checkIsString(str, variableName){
    if (typeof str !== 'string') {
      throw `${variableName || 'Provided input'} is not a string`;
    }
}
function checkSpaces(str, variableName){
    if(str.split(" ").join("").length == 0){
        throw `You have entered only spaces for input${variableName || ''}`;
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
function checkDate(date){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    if(date == today){
        return true;
    }
    return false;
}
function checkRating(rating){
    if(rating<1 || rating>5){
        throw `Provide valid rating`;
    }
}
// async function calcRating(resId, rating, number){
//     const res = await restaurantCollection.findOne({ _id: resId });
//     const count = res[review].length;
// }

async function create(restaurantId, title, reviewer, rating, dateOfReview, review){
    if(!restaurantId || !title || !reviewer || !rating || !dateOfReview || !review){
        throw `All fields need to have valid values`;
    }
    checkIsString(restaurantId);checkIsString(title);checkIsString(reviewer);checkIsString(dateOfReview);checkIsString(review);
    checkSpaces(restaurantId);checkSpaces(title);checkSpaces(reviewer);checkSpaces(dateOfReview);checkSpaces(review);
    checkRating(rating);
    if(!checkDate(dateOfReview)){
        throw `Please provide valid date`;
    }
    let resId = checkID(restaurantId);
    const restaurantsCollection = await restaurants();
    let newReview = {
        _id: new ObjectId(),
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review
    }
    const insertInfo = await restaurantsCollection.updateOne({ _id: resId }, { $push: {reviews: newReview} });
    if (insertInfo.insertedCount === 0) throw 'Could not add review';
    const res = await restaurant.get(resId.toString());
    let count = res.reviews.length;
    let rate = res.overallRating;
    rate = ((rate*(count-1)) + rating)/(count);
    rate = Math.round(rate * 10) / 10;
    let updatedRestaurantData = {
        overallRating: rate
    }
    const update = await restaurantsCollection.updateOne({_id: resId}, {$set: updatedRestaurantData});
    const finalRestaurant = await restaurant.get(resId.toString());
    return finalRestaurant;
}

async function get(reviewId){
    if (!reviewId) throw 'You must provide an id to search for';
    checkIsString(reviewId);
    checkSpaces(reviewId);
    let resId = checkID(reviewId);
    const restaurantCollection = await restaurants();   
    let restaurant = await restaurantCollection.find({"reviews": {$elemMatch: {_id: resId}}}).toArray();
    for(let index in restaurant[0].reviews){
        if(restaurant[0].reviews[index]._id.toString() === reviewId.toString()){
            restaurant[0].reviews[index]._id = restaurant[0].reviews[index]._id.toString();
            return restaurant[0].reviews[index];
        }
    }
}

async function getAll(restaurantId){
    if (!restaurantId) throw 'You must provide an id to search for';
    let resId = checkID(restaurantId);
    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({ _id: resId });
    if (restaurant === null){
        throw 'No restaurant with that id';
    }
    const reviews = restaurant.reviews;
    for(let i=0; i<reviews.length;i++){
        reviews[i]['_id'] = reviews[i]._id.toString();
    }
    return reviews;
}

async function remove(reviewId){
    if (!reviewId) throw 'You must provide an id to search for';
    checkIsString(reviewId);
    checkSpaces(reviewId);
    let resId = checkID(reviewId);
    const restaurantCollection = await restaurants();
    let restaurant = await restaurantCollection.find({"reviews":{$elemMatch:{_id: resId}}}).toArray();
    let oRating = restaurant[0].overallRating;
    let count = restaurant[0].reviews.length;
    oRating = oRating * count;
    for(let index in restaurant[0].reviews){
        if(restaurant[0].reviews[index]._id.toString() === reviewId.toString()){
            oRating = oRating - restaurant[0].reviews[index].rating;
            if(count <= 1){
                oRating = 0;
            }
            else{
                oRating = oRating/(count-1);
            }
            restaurant[0].overallRating = Math.round(oRating * 10) / 10;
            restaurant[0].reviews.splice(index,1);
            const restaurantsCollection = await restaurants();
            const update = await restaurantsCollection.updateOne({_id: restaurant[0]._id}, {$set: restaurant[0]});
            return update;
        }
    }

}
module.exports = {
    create,
    get,
    getAll,
    remove
}