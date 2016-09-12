function openNav() {
    document.getElementById("mySidenav").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";

}
// If there a user is loged in and the search bar is present, attach a listener.
document.querySelector(".search") ? 
document.querySelector(".search").addEventListener('click', function(e) {
	e.preventDefault;
	// Grab the input value.
	let term = document.querySelector("input").value;
	// Create a stringified object to send to the server.
	let data = JSON.stringify({ searchTerm : term });
	let request = new XMLHttpRequest();
	request.open('POST', '/search');
	request.setRequestHeader('Content-Type', 'application/json');
	request.onload = function() {
    if (request.status === 200) {
    	// Parse the payload.
    	let payload = JSON.parse(request.response);
    	console.log(payload)
    	// Select the playlists div so we can check if it is empty.
    	let myNode = document.querySelector(".playlists");
    	// Remove each child before populating with new data.
		while (myNode.firstChild) {
    		myNode.removeChild(myNode.firstChild);
		}
      	// Loop through the playlists that we recieve from the server.
        payload.playlists.items.forEach(item => {
        	// Create a new div with a class of "playlistDiv"
        	let node = document.createElement("DIV"); 
        	node.setAttribute("class", "playlistDiv");
        	// Create new text for each playlist name.          
			let name = document.createElement("P");
			name.innerHTML = `${item.name}`; 
			// Create a new image tag with a class of "playlistImg".
			// Provide the playlist image url to the image tag.
			let image = document.createElement("IMG")
			image.setAttribute("class", "playlistImg")
			image.setAttribute("src", `${item.images[0].url}`)    
			// First append the name text, then append the image.
			node.appendChild(name);   
			node.appendChild(image);
			node.addEventListener("click" , function() {
				var URL = `https://embed.spotify.com/?uri=${item.uri}`
				document.querySelector("iframe").setAttribute("src", URL)
			})
			// Finally, append the whole div to the main playlist div.
        	document.querySelector(".playlists").appendChild(node)
        })
    } 
    else {
        alert('Search failed')
    }
};	
// Send the request with the search term.
request.send(data)
})
: null;
var img = document.querySelector('iframe')

new MutationObserver(function onSrcChange(){
	function insertAfter(referenceNode, newNode) {
    	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}
 	let newButton = document.createElement("BUTTON");
 	newButton.setAttribute("id", "startMood")
 	let refNode = document.querySelector(".personalPlaylist");
 	let checkButton = document.querySelector('#startMood');
 	// If the 'set the mood' button is already on the page, do nothing.
 	// If not, put it on the page.
 	checkButton ? null : 
	insertAfter(refNode, newButton)
 	newButton.innerHTML ="press to set the mood";
	openNav();
	document.querySelector('.closebtn').addEventListener('click', function(e){
		e.preventDefault();
		 closeNav();
	})


     // var op = parseFloat(image.style.opacity);

     //        var timer = setInterval(function () {
     //            console.log('here');
     //            if(op >= 1.0)
     //                clearInterval(timer);

     //            op += 0.1;
     //            image.style.opacity = op;
     //        }, 500);
})
  .observe(img,{attributes:true,attributeFilter:["src"]})


///////////////////////////SEARCH THROUGH YOUR OWN SPOTIFY PLAYLSITS////////
document.querySelector('.personalPlaylist').addEventListener('click', function() {
	alert('clickeeeed')
})
