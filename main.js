var express = require('express');
var app = express();
//var route = express.Router; // tjeck if works
var BodyParser =  require('body-parser');

//what does it do?
app.use(BodyParser.urlencoded({
    extended: true
}));

app.use(BodyParser.json());
