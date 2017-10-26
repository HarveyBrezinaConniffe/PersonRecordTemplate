//Define a dictionary/object to store the points for each person!
var peoplecells = {};

getPeople();

//A function to download a list of people from the server!
function getPeople() {
	var headers = new Headers();

	headers.append('Accept', 'application/json'); // This one is enough for GET requests
	headers.append('Content-Type', 'application/json'); // This one sends body

	return fetch('/getpeople', {
	    method: 'GET',
	    mode: 'same-origin',
	    credentials: 'include',
	    redirect: 'follow',
	    headers: headers
	}).then(resp => {
		console.log("Response!");
		return resp.json();
	}).then(p => {
		for (var key in p) {
			if (p.hasOwnProperty(key)) {
				addPerson(key, p[key][0], p[key][1]);
				console.log(key, p[key][0], p[key][1]);
			}
		}
	}).catch(err => {
		console.log("Error! "+err);
	});

}

//Function run when 'add' button pressed.
function addButtonPressed() {
	var name = document.getElementById("name").value;	
	var age = document.getElementById("age").value;	
	addPerson(name, age);
	addToServer(name, age);
}

//Function to send a removed call to the server.
function removePerson(name, age) {
	var headers = new Headers();

	headers.append('Accept', 'application/json'); // This one is enough for GET requests
	headers.append('Content-Type', 'application/json'); // This one sends body

	return fetch('/removeperson?name='+name+'&age='+age, {
	    method: 'GET',
	    mode: 'same-origin',
	    credentials: 'include',
	    redirect: 'follow',
	    headers: headers
	}).then(resp => {
		console.log("Removed person!");
		var table = document.getElementById("table");
		var length = table.getElementsByTagName("tr").length;
		console.log(length);
		for(var i = 1;i < length; i++) {
			console.log("Clearing "+1);
			table.deleteRow(1);	
		}	
		getPeople();
	}).catch(err => {
		console.log("Error! "+err);
	});
}

//Function to tell the server to add a point.
function addPoint(name) {
	var tablecell = peoplecells[name];
	var points = parseInt(tablecell.innerHTML);
	points += 1;
	tablecell.innerHTML = points;

	var headers = new Headers();

	headers.append('Accept', 'application/json'); // This one is enough for GET requests
	headers.append('Content-Type', 'application/json'); // This one sends body

	return fetch('/addPoint?name='+name+'&points='+points, {
	    method: 'GET',
	    mode: 'same-origin',
	    credentials: 'include',
	    redirect: 'follow',
	    headers: headers
	}).then(resp => {
		console.log("Added points to person!");
	}).catch(err => {
		console.log("Error! "+err);
	});
}

//Function to add a new person to the table!
function addPerson(name, age, points) {
	// Find a <table> element with id="myTable":
	var table = document.getElementById("table");

	// Create an empty <tr> element and add it to the end position of the table:
	var row = table.insertRow(table.length);

	// Insert new cells (<td> elements) at the 1st, 2nd and 3rd position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);

	peoplecells[name] = cell3;

	// Add some text to the new cells:
	cell1.innerHTML = name;
	cell2.innerHTML = age;
	cell3.innerHTML = points;
	cell4.innerHTML = "<center><button onclick='addPoint(\""+name+"\")'>Add Point</button><button onclick='removePerson(\""+name+"\", \""+age+"\")'>Delete</button></center>";
}

//Function to send add message to server!
function addToServer(name, age) {
	var headers = new Headers();

	headers.append('Accept', 'application/json'); // This one is enough for GET requests
	headers.append('Content-Type', 'application/json'); // This one sends body

	return fetch('/addperson', {
	    method: 'POST',
	    mode: 'same-origin',
	    credentials: 'include',
	    redirect: 'follow',
	    headers: headers,
	    body: JSON.stringify({
		name: name,
		age: age
	    }),
	}).then(resp => {
		console.log("Added person!");
	}).catch(err => {
		console.log("Error! "+err);
	});
}
