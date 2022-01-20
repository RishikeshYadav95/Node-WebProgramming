const mongoCollection = require('../config/mongoCollections');
const users = mongoCollection.users;
const bcrypt = require('bcryptjs');

function checkIsString(str, variableName){
    if (typeof str !== 'string') {
      throw `${variableName || 'Provided input'} is not valid`;
    }
}

function isAplhaNumeric(str, variableName){
	if(!str.match(/^[A-Za-z0-9]+$/)){
		throw `${variableName || 'Provided input'} is not valid`;
	}
}

function checkSpaces(str, variableName){
	if (str.trim().length == 0){
		throw `${variableName || 'Provided input'} is not valid`;
	}
	if (str.match(/\s/g)){
		throw `${variableName || 'Provided input'} is not valid`;
	}
}

async function createUser(username, password) {
	if (!username || !password) throw 'Missing parameters';
	checkIsString(username, "Username");
	checkIsString(password, "Password");
	checkSpaces(username, "Username");
	checkSpaces(username, "Password");
	isAplhaNumeric(username, "Username");
	if (username.length < 4)
		throw 'Username is not valid';
	if (password.length < 6)
		throw 'Password is not valid';
	username = username.toLowerCase();
	password = await bcrypt.hash(password, 2);

	const usersCollection = await users();

	let user = await usersCollection.findOne({ username: username });
	if (user){
		throw {errorStatusCode: 400, error: "Username already exists"};
	}
	let newUser = {
		username: username,
		password: password,
	};
	let insertInfo = await usersCollection.insertOne(newUser);
	if (insertInfo.insertedCount == 0){
		throw 'User not inserted';
	}
	return { userInserted: true };
};

async function checkUser(username, password) {
	if (!username || !password) throw 'Incomplete parameters';
	checkIsString(username, "Username");
	checkIsString(password, "Password");
	checkSpaces(username, "Username");
	checkSpaces(username, "Password");
	isAplhaNumeric(username, "Username");
	if (username.length < 4)
		throw 'Username is not valid';
	if (password.length < 6)
		throw 'Password is not valid';
	username = username.toLowerCase();

	const usersCollection = await users();

	const user = await usersCollection.findOne({ username: username });
	if (!user) {
		throw {errorStatusCode: 400, error: "Username already exists"};
	} 
	else if (await bcrypt.compare(password, user.password)){
		return { authenticated: true };
	}
	return { authenticated: false };
};

module.exports = {
	createUser,
	checkUser
};