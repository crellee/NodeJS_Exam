var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId =require('mongodb').ObjectId;
var url = require('../config/config.js').mongodb;


app.get('/teams', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('teams');

        collection.find({}).toArray(function(err, data) {
            if(err) {
                res.status(400);
            }
            else {
                res.status(200);
                res.json(data);
                db.close();
            }
        });
    });
});

app.get('/teams/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('teams');

        collection.findOne({'_id' : ObjectId(req.params.id)}, function(err, data) {
            if(err) {
                res.status(400);
            }
            else {
                res.status(200)
                res.send(data);
                db.close();
            }
        });
    });
});


app.post('/teams', function(req, res) {
    MongoClient.connect(url, function(err, db) {

        var playerCollections = db.collection('players');
        var teamsCollections = db.collection('teams');
        
        // declare a teams Object
        var teamsObj =  {};
        
        playerCollections.findOne({'_id' : ObjectId(req.body.players), function(err, playerData) {

            teamObj.players = [];

            teamsObj.players.push(playerData);
                teamsCollections.insert(teamObj, function(err, teamData) {
                    if(err) {
                        res.status(400);
                    }
                    else {
                        res.status(201);
                        res.location('/teams/' + teamData.insertedIds.toString());
                        res.send({"msg" : "Team created"});
                        db.close();
                    }
                });
            }
        });
    });
});

// Update Route
app.put('/teams/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('teams');

        collection.update({'_id' : ObjectId(req.params.id)}, {$set: req.body}, function(err, data) {
            if(err) {
                res.status(400);
            }
            else {
                res.status(200);
                res.send({"msg" : "Team " + req.params.id  + " updated"});
                db.close();
            }
        });
    });
});

// delete Route
app.delete('/teams/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('teams');

        collection.remove({'_id' : ObjectId(req.params.id)}, function(err, data) {
            if(err) {
                res.status(400);
            }
            else {
                res.status(200);
                res.send({"msg" : "Team " + req.params.id + " deleted"});
                db.close();
            }
        });
    });
});

// exports our module to use in our server enviroment.

module.exports = app;

