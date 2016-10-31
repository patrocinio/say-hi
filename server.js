// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// HAL support
var halson = require('halson');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port, defaulting if nothing is specified in the env
var port = process.env.PORT || 8080;        

// load app configurations from config.js
var config = require('./config');

// get an instance of the express Router, allowing us to add
// middleware and register our API routes as needed
var router = express.Router(); 


router.get('/say-hi', function(req, res) {
	    res.setHeader('Content-Type', 'application/hal+json');

        var resource = halson({
                               response: "Hi"
                              }).addLink('self', '/say-hi/');
	    res.send(JSON.stringify(resource));

           });


// Register our route
app.use('/', router);

// Start the server
app.listen(port);
console.log('Running on port ' + port);
