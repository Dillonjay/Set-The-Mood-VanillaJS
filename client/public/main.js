
// Ajax request without Jquery/ 
document.querySelector("h1").addEventListener('click', function() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/');
	xhr.onload = function() {
    if (xhr.status === 200) {
        alert(xhr.responseText);
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};	
// Send the request
xhr.send()
});

//Ajax request to authenticate a spotify user.
