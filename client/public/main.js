	let data = JSON.stringify({ searchTerm : "love" });
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
				document.querySelector(".spotifyIframe").setAttribute("src", URL)
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


function openNav() {
    document.getElementById("mySidenav").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";

}
// If there a user is loged in and the search bar is present, attach a listener.

document.querySelector(".search").addEventListener('click', function(e) {
	e.preventDefault;
	// Grab the input value.
	let term = document.querySelector("input").value;
	// Clear input value.
    document.querySelector('input').value = "";
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
				document.querySelector(".spotifyIframe").setAttribute("src", URL)
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

//////// Also listen for keypress
document.querySelector("input").addEventListener('keypress', function(e) {
	// Grab the input value.
	var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
	let term = document.querySelector("input").value;
	// Clear input value.
    document.querySelector('input').value = "";
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
				document.querySelector(".spotifyIframe").setAttribute("src", URL)
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
    }
})

var img = document.querySelector('.spotifyIframe')

new MutationObserver(function onSrcChange(){
	function insertAfter(referenceNode, newNode) {
    	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}
 	
	openNav();
	document.querySelector('.closebtn').addEventListener('click', function(e){
		e.preventDefault();
		 closeNav();
	})
})
  .observe(img,{attributes:true,attributeFilter:["src"]})


///////////////////////////SEARCH THROUGH YOUR OWN SPOTIFY PLAYLSITS////////
document.querySelector('.personalPlaylist').addEventListener('click', function() {
	var request = new XMLHttpRequest();
	request.open('GET', '/getUserPlaylists');
	request.onload = function() {
   	 if (request.status === 200) {
        let payload = JSON.parse(request.response);
        console.log(payload)
        // Select the playlists div so we can check if it is empty.
    	let myNode = document.querySelector(".playlists");
    	// Remove each child before populating with new data.
		while (myNode.firstChild) {
    		myNode.removeChild(myNode.firstChild);
		}
      	// Loop through the playlists that we recieve from the server.
        payload.items.forEach(item => {
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
				document.querySelector(".spotifyIframe").setAttribute("src", URL)
			})
			// Finally, append the whole div to the main playlist div.
        	document.querySelector(".playlists").appendChild(node)
        })
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
request.send();
})

// Loop through the array of elements with the class name of scene.
// Attach an event listener on each of them.
document.querySelectorAll('.scene').forEach( scene => {
	scene.addEventListener('click', function(e) {
	var URL = `http://www.youtube.com/embed/${this.id}`	
	document.querySelector('#player').setAttribute("src", URL)
	
	})
})
/////////////

var player, iframe;
var $ = document.querySelector.bind(document);

// init player
function onYouTubeIframeAPIReady() {
	console.log('this', this)
  player = new YT.Player('player', {
    height: '200',
    width: '1260',
    videoId: 'MY-f7whE_qE',
    events: {
      'onReady': onPlayerReady
    }
  });
}

// when ready, wait for clicks
function onPlayerReady(event) {
  var player = event.target;
  iframe = $('#player');
  setupListener(); 
}

function setupListener (){
document.querySelectorAll('.scene').forEach( scene => {
	console.log('id', this.id)
	scene.addEventListener('click', function() {
	var URL = `http://www.youtube.com/embed/${this.id}`	
	document.querySelector('#player').setAttribute("src", URL)
	playFullscreen()
	});
	})
}

function playFullscreen (){
  player.playVideo();//won't work on mobile
  
  var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
  if (requestFullScreen) {
    requestFullScreen.bind(iframe)();
  }
}




