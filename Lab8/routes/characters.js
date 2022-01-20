const express = require('express');
const router = express.Router();
const data = require('../data');
const characterData = data.searchData;

function checkIsString(str, variableName){
    if (typeof str !== 'string') {
        res.status(400).render('error', {errorMessage: "Keyword should be a string.", errorStatusCode:400, title: "Something went wrong..", className:"error"});
        return;
    }
}

function checkLength(str, variableName){
    if(str.trim().length < 1){
        res.status(400).render('error', {errorMessage: "Keyword cannot be empty", errorStatusCode:400, title: "Something went wrong..", className:"error"});
        return;
    }
}
router.get('/', async (req, res)=>{
    try{
        const title = "Character Finder";
        res.render('first', {title:title});
    }catch(e){
        res.status(500);
        res.render('error', {errorMessage: e, errorStatusCode:500, title: "Something went wrong..", className:"error"});    
    }
});

router.post('/search', async (req, res)=>{
    try{        
        const keyword = req.body.searchCharacter;
        if(!keyword){
            res.status(400).render('error', {errorMessage: "Missing input keyword", errorStatusCode:400, title: "Something went wrong..", className:"error"});
            return;
        }
        const result = await characterData.getSearch(keyword);
        const title = "Characters Found";
        res.render('search', { searchResult: result, title: title, searchCharacter: keyword });        
    }catch(e){
        res.status(400).render('error', {errorMessage: e, errorStatusCode:404, title: "Something went wrong..", className:"error"});
        return;    
    }
});

router.get('/characters/:id', async(req,res)=>{
    try{
        const id  = req.params.id;
        if(!id){
            res.status(404).render('error', {errorMessage: "Id not found.", errorStatusCode:404, title: "Something went wrong..", className:"error"});
            return;
        }
        const result = await characterData.getCharacter(id);
        if(!result || result.data.results.length < 1){
            res.status(404).render('error', {errorMessage: "Character not found for specified id", errorStatusCode:404, title: "Something went wrong..", className:"error"});
            return;
        }
        const character = result.data.results[0];
        const title = character.name;
        res.render('character', {character:character, title:title});
    }
    catch(e){
        res.status(404);
        res.render('error', {errorMessage: e, errorStatusCode:404, title: "Something went wrong..", className:"error"});
    }     
});

module.exports = router;