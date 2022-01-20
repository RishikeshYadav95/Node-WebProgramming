const axios = require('axios').default;
const md5 = require('blueimp-md5');
const publickey = 'adf85910da36a129579cd41d488b6990';
const privatekey = '6f4d28bb906268e30ecbe01c9e294a39478f14b7';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

function checkIsString(str, variableName){
    if (typeof str !== 'string') {
        throw `${variableName || 'Provided input'} is not a string`;
    }
}

function checkLength(str, variableName){
    if(str.trim().length < 1){
        throw `${variableName || 'Provided input'} is empty spaces`;
    }
}

const getSearch = async(keyword) =>{
    if(!keyword){
        throw `Provide a keyword to make the search`;
    }
    checkIsString(keyword);
    checkLength(keyword);
    const baseUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${keyword}`;
    const url = baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    const  result  = await axios.get(url);
    return result.data.data.results;
}
const getCharacter = async(id) =>{
    if(!id){
        throw {errorMessage:`Provide a valid id to make the search`, errorStatusCode : 400};
    }
    checkIsString(id);
    checkLength(id);
    const link = baseUrl +"/"+ id + url;
    let result = await axios.get(link);
    return result.data;
}

module.exports = {
    getSearch,
    getCharacter
};