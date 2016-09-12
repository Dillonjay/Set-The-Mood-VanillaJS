
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
			let name = document.createTextNode(`${item.name}`); 
			// Create a new image tag with a class of "playlistImg".
			// Provide the playlist image url to the image tag.
			let image = document.createElement("IMG")
			image.setAttribute("class", "playlistImg")
			image.setAttribute("src", `${item.images[0].url}`)    
			// First append the name text, then append the image.
			node.appendChild(name);   
			node.appendChild(image);
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

