var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId =require('mongodb').ObjectId;
var url = require('../config/config.js').mongodb;


//route to all players
app.get('/players', function(req, res){

    MongoClient.connect(url, function(err, db){

            var collection = db.collection('players');
            collection.find({}).toArray(function(err, data){
                if(err) {
                    res.status(404);
                }
                else {
                    res.status(200);
                    res.json(data);
                    db.close();
                }
            });
    });

});

app.get('/players/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('players');

        collection.findOne({'_id' : ObjectId(req.params.id)}, function(err, data) {
            if(err) {
                res.status(404);
            }
            else {
                res.status(200);
                res.send(data);
                db.close();
            }
        });
    });

}); 

app.post('/players', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('players');

        collection.insert(req.body, function(err, data) {
            if(err) {
                res.status(400);
            }
            else {
                res.status(201);
                res.send({"msg" : "Player created"});
                db.close();
            }            
        });
    });
});

// Update Route
app.put('/players/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('players');

        collection.update({'_id' : ObjectId(req.params.id)}, {$set: req.body}, function(err, data) {
            if(err) {
                res.status(400);
            }
            else {
                res.status(200);
                res.send({"msg" : "Players updated"});
                db.close();
            }
            
        });
    });
});

// delete Route
app.delete('/players/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('players');

        collection.remove({'_id' : ObjectId(req.params.id)}, function(err, data) {
            if(err) {
                res.status(400);
            }
            else {
                res.status(200);
                res.send({"msg" : "Player deleted"});
                db.close();
            }
        });
    });
});

// exports our module to use in our server enviroment.
module.exports = app;


