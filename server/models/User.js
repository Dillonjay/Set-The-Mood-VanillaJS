
const User = exports;
// Function for extracting a users display name and photo from spotify'
User.welcomeUser = function(userStuff) {
	let info = {};
	info.name = userStuff.displayName;
	info.photo = userStuff.photos[0];
	return info;
};

User.grabId = function(userStuff) {
	return new Promise(function (resolve, reject){
		let info = {};
		info.id = userStuff.id;
		info.token = userStuff.token
		resolve(info)
  	})
};
