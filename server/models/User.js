
const User = exports;
User.storeUser = function(userStuff) {
	var info = {};
	info.name = userStuff.displayName;
	info.photo = userStuff.photos[0];
	console.log(info)
}