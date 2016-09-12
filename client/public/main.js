
// Ajax request without Jquery.

document.querySelector(".search") ? 
document.querySelector(".search").addEventListener('click', function(e) {
	e.preventDefault;
	let term = document.querySelector("input").value;
	alert(term)
	let data = JSON.stringify({ searchTerm : term });
	let request = new XMLHttpRequest();
	request.open('POST', '/search');
	request.setRequestHeader('Content-Type', 'application/json');
	request.onload = function() {
    if (request.status === 200) {
    	let results = JSON.parse(request.response);
        console.log(results);
        results.playlists.items.forEach(item => {
        	console.log(item.name)

        	var node = document.createElement("DIV");               
			var textnode = document.createTextNode(`${item.name}`);  
			var x = document.createElement("IMG")
			x.setAttribute("class", "playlistImg")
			x.setAttribute("src", `${item.images[0].url}`)    
			node.appendChild(textnode);   
			node.appendChild(x);

        	document.querySelector(".playlists").appendChild(node)
        })
    } 
    else {
        alert('Request failed.  Returned status of ' + request.status);
    }
};	
// Send the request
request.send(data)
})
: null;

//Ajax request to authenticate a spotify user.
