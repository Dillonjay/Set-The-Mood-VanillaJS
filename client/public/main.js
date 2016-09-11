
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
        alert(request.response);
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
