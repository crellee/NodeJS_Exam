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

                res.send(data);
                db.close();
            });
    });

});

// exports our module

module.exports = app;


