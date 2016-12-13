var express = require('express');
var app = express();
//var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId =require('mongodb').ObjectId;
var url = require('../config/config.js').mongodb;

//I PROMISE (mPromise)
mongoose.Promise = global.Promise;

var playerSchema = new Schema({
    name : String,
    team : String,
    position : String,
    picture : String
}, { collection : 'players'});

var PlayerSch = mongoose.model('PlayerSch', playerSchema);

//route to all players
app.get('/players', function(req, res){

    mongoose.connect(url, function(err, db){

        PlayerSch.find({}).lean().exec(function(err, data){
            if(err) {
                res.status(404);
            }
            else {
                res.status(200);
                res.json(data);
                mongoose.disconnect();
            }
        });
    });

});

app.get('/players/:id', function(req, res) {

    mongoose.connect(url, function(err, db) {

        PlayerSch.findOne({'_id' : ObjectId(req.params.id)}, function(err, data) {
            if(err) {
                res.status(404);
            }
            else {
                res.status(200);
                res.send(data);
                mongoose.disconnect();
            }
        });
    });

}); 

app.post('/players', function(req, res) {

    mongoose.connect(url, function(err, db) {

        PlayerSch.create(req.body, function(err, data) {
            if(err) {
                res.status(400);
            }
            else {
                res.status(201);
                res.send(data);
                mongoose.disconnect();
            }            
        });
    });
});

// Update Route
app.put('/players/:id', function(req, res) {

    mongoose.connect(url, function(err, db) {

        PlayerSch.update({'_id' : ObjectId(req.params.id)}, {$set: req.body}, function(err, data) {
            if(err) {
                res.status(400);
            }
            else {
                res.status(200);
                res.send({"msg" : "Players updated"});
                mongoose.disconnect();
            }
            
        });
    });
});

// delete Route
app.delete('/players/:id', function(req, res) {

    mongoose.connect(url, function(err, db) {

        PlayerSch.remove({'_id' : ObjectId(req.params.id)}, function(err, data) {
            if(err) {
                res.status(400);
            }
            else {
                res.status(200);
                res.send({"msg" : "Player deleted"});
                mongoose.disconnect();
            }
        });
    });
});

// exports our module to use in our server enviroment.
module.exports = app;


