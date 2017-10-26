// "Import" the relevant modules. HTTP and Express to serve Websites. We also import body-parser( Addon of Express. ) to let us read JSON that is sent to us.
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Choose which port to send out the HTML on. Websites normally use 80.
var port = 3000;

// Now our Server will send the Websites code to any browser that asks for it.
app.use(express.static('Website'));

app.post('/addperson', function(req, res) {
	var name = req.body.name;		
	var age = req.body.age;		
	console.log("Adding "+name+" who is "+age+" years old.");
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ iserr: false }));	
});

app.get('/getpeople', function(req, res) {	
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({"Harvey": 16}));	
});

app.get('/removeperson', function(req, res) {
	var name = req.query.name;		
	var age = req.query.age;		
	console.log("Removing "+name+" who is "+age+" years old.");
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ iserr: false }));	
	
});

app.get('/addPoint', function(req, res) {
	var name = req.query.name;		
	var points = req.query.points;		
	console.log("Adding point to "+name+" who now has "+points+" points.");
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ iserr: false }));	
	
});

// Start listening for connections on our chosen port.
http.listen(port, function(){
	// Print out some status information.
	console.log('listening on port '+port);
});
