
const User = exports;
// Function for extracting a users display name and photo from spotify'
User.welcomeUser = function(userStuff) {
	let info = {};
	info.name = userStuff.displayName;
	info.photo = userStuff.photos[0];
	return info;
};
