const users = require('../data/users');
const express = require("express");
const router = express.Router();

router.get("/", async(req,res) => {
    if(req.session.user){
        res.redirect("/private");
    }
    else{
        res.render("login");
    }
});

router.get('/signup', async (req, res) => {
	if(req.session.user) {
        res.redirect('/private');
	}
    else {
		res.render('signup');
	}
});

router.get('/private', async (req, res) => {
	res.render('welcome', {username: req.session.user,});
});

router.get('/logout', async (req, res) => {
	req.session.destroy();
	res.render('logout');
});

router.post('/signup', async (req, res) => {
	try {
		username = req.body.username;
		password = req.body.password;
		if (!username || !password){
            res.status(400).render('signup', { error: 'Missing parameters'});
            return;
        }
        if (typeof username !== 'string') {
            res.status(400).render('signup', { error: 'Username is not a string'});
            return;
        }
        if (typeof password !== 'string') {
            res.status(400).render('signup', { error: 'Password is not a string'});
            return;
        }
        if (username.length < 4) {
            res.status(400).render('signup', { error: 'Invalid length for Username'});
            return
        }
        if (password.length < 6) {
            res.status(400).render('signup', { error: 'Invalid length for Password'});
            return;
        }
        if (username.trim().length == 0 || username.match(/\s/g) || !username.match(/^[a-zA-Z0-9]/g)) {
            res.status(400).render('signup', { error: 'Invalid Username'});
            return;
        }
        if (password.match(/\s/g)) {
            res.status(400).render('signup', { error: 'Invalid Password'});
            return;
        }
		const addUser = await users.createUser(username, password);
		if (addUser) {
			res.redirect('/');
		}
        else {
			res.status(500).render('signup', { error: 'Internal Server Error'});
            return;
		}
	} catch (e) {
        if(e.errorStatusCode == 400 || e.errorStatusCode == 500){
            res.status(e.errorStatusCode).render('signup', { error: e.error });
            return;
        }
		res.status(403).render('error', {errorMessage: e});
        return;
	}
});

router.post('/login', async (req, res) => {
	try {
		username = req.body.username;
		password = req.body.password;
		if (!username || !password){
            res.status(400).render('login', { error: 'Missing parameters'});
            return;
        }
        if (typeof username !== 'string') {
            res.status(400).render('login', { error: 'Username is not a string'});
            return;
        }
        if (typeof password !== 'string') {
            res.status(400).render('login', { error: 'Password is not a string'});
            return;
        }
        if (username.length < 4) {
            res.status(400).render('login', { error: 'Invalid length for Username'});
            return
        }
        if (password.length < 6) {
            res.status(400).render('login', { error: 'Invalid length for Password'});
            return;
        }
        if (username.trim().length == 0 || username.match(/\s/g) || !username.match(/^[a-zA-Z0-9]/g)) {
            res.status(400).render('login', { error: 'Invalid Username'});
            return;
        }
        if (password.match(/\s/g)) {
            res.status(400).render('login', { error: 'Invalid Password'});
            return;
        }
		const fetchUser = await users.checkUser(username, password);
		if (fetchUser.authenticated == true) {
			req.session.user = username;
			res.redirect('/private');
		} else {
			res.status(400).render('login', {error: 'Invalid username or password'});
		}
	} catch (e) {
		if(e.errorStatusCode == 400 || e.errorStatusCode == 500){
            res.status(e.errorStatusCode).render('login', { error: e.error });
            return;
        }
		res.status(403).render('error', {errorMessage: e});
        return;
	}
});

module.exports = router;