var express = require('express');
var app = express();
//var route = express.Router; // tjeck if works
var BodyParser =  require('body-parser');



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// Parses the data submitted from the body and turns it into URL.
// Parses the data to json.
app.use(BodyParser.urlencoded({
    extended: true
}));
app.use(BodyParser.json());

// Routes
var players = require('./routes/playersMongoose.js');
app.use(players);
var teams = require('./routes/teams.js');
app.use(teams);

//If Page NOT found (404)
app.use(function(req, res) {
    res.status(404);
    res.send({ 'msg' : 'Page Not Found'});
});




// Server listen on either the enviroment port from Heroku or localhost port 3000
app.listen(process.env.PORT || 3000);





