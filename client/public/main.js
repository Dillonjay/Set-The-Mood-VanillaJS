
// Ajax request without Jquery.

document.querySelector(".search") ? 
document.querySelector(".search").addEventListener('click', function(e) {
	e.preventDefault;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/search');
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
})
: null;

//Ajax request to authenticate a spotify user.
