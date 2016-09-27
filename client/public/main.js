// All videos that are going to be appended to the page
let videoInfo = [
"p91kHbSksW4,https://i.ytimg.com/vi/p91kHbSksW4/hqdefault.jpg",
"hs86eBCT4dI,https://i.ytimg.com/vi/hs86eBCT4dI/hqdefault.jpg",
"4RUGmBxe65U,https://i.ytimg.com/vi/4RUGmBxe65U/hqdefault.jpg",
"MY-f7whE_qE,https://i.ytimg.com/vi/MY-f7whE_qE/hqdefault.jpg",
"vGbRxR03jV8,https://i.ytimg.com/vi/vGbRxR03jV8/hqdefault.jpg",
"5eLcHJLDlI8,https://i.ytimg.com/vi/5eLcHJLDlI8/hqdefault.jpg",
"f61PbjjVuF0,https://i.ytimg.com/vi/f61PbjjVuF0/hqdefault.jpg",
"V4Oosy-ZtGY,https://i.ytimg.com/vi/V4Oosy-ZtGY/hqdefault.jpg",
"_gp51lt9kdA,https://i.ytimg.com/vi/_gp51lt9kdA/hqdefault.jpg"
]



/////////Pre populate the page with playlists.
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
        	// Only put the videos on the page after the playlists have been populated.
        	let video = document.querySelector(".video");
    		// Remove each child before populating with new data.
			while (video.firstChild) {
    		video.removeChild(video.firstChild);
			}
			videoInfo.forEach(item => {
				document.querySelector('.video')
				let node = document.createElement("IMG"); 
			    node.setAttribute("class", "scene");
			    node.setAttribute("id", `${item.slice(0,11)}`)
			    node.setAttribute("src", `${item.slice(12, item.length)}`)
			    node.addEventListener('click', function() {
				var URL = `http://www.youtube.com/embed/${this.id}`	
				document.querySelector('#player').setAttribute("src", URL)
				playFullscreen()
				})
			    document.querySelector('.video').appendChild(node)
			})
			// Place open sidbar button on the page.

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
//// SEARCH SPOTIFY PLAYLISTS WITH BUTTON///////
document.querySelector(".search").addEventListener('click', function(e) {
	e.preventDefault;
	// Grab the input value.
	let term = document.querySelector(".search_spotify").value;
	// Clear input value.
    document.querySelector('.search_spotify').value = "";
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

//////// FULL SCREEN /////////
var player, iframe;
var $ = document.querySelector.bind(document);

// init player
function onYouTubeIframeAPIReady() {
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

//////POP UPPPP/////////////////

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.querySelector(".youtube");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//////////SEARCH YOUTUBE /////////
document.querySelector('.search_youtube_button').addEventListener('click', function(e) {
	e.preventDefault;
	let term = document.querySelector(".search_youtube").value;
	// Clear input value.
    document.querySelector('.search_youtube').value = "";
	// Create a stringified object to send to the server.
	let data = JSON.stringify({ searchTerm : term });
	let request = new XMLHttpRequest();
	request.open('POST', '/search/youtube');
	request.setRequestHeader('Content-Type', 'application/json');
	request.onload = function() {
    if (request.status === 200) {
    	// Parse the payload.
    	let payload = JSON.parse(request.response);
   
    	

    	// Clear all videos from the page.
		let video = document.querySelector(".video");
    		// Remove each child before populating with new data.
		while (video.firstChild) {
    		video.removeChild(video.firstChild);
    	}
      	//Loop through the playlists that we recieve from the server.
        payload.items.forEach(item => {
       
        	// Create a new div with a class of "playlistDiv"
        	let node = document.createElement("IMG"); 
        	node.setAttribute("class", "scene");
        	node.setAttribute("id", `${item.id.videoId}`);
        	node.setAttribute("src", `${item.snippet.thumbnails.high.url}`)
        	// Create new text for each playlist name.          

			node.addEventListener("click" , function() {
		
			var URL = `http://www.youtube.com/embed/${this.id}`	
			document.querySelector('#player').setAttribute("src", URL)
			playFullscreen()
			})
			// Finally, append the whole div to the main playlist div.
        	document.querySelector(".video").appendChild(node)
        })
    } 
    else {
        alert('Search failed')
    }
};	
// close the search modal
document.getElementById('myModal').style.display ="none"
// Send the request with the search term.
request.send(data)

})

