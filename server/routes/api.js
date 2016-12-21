const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
let params = fs.readFileSync("parameters.JSON");
// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});
let db;
// Get all posts
router.get('/posts', (req, res) => {
  MongoClient.connect('mongodb://'+params.username+':'+params.password+'@ds141128.mlab.com:41128/rob-test', (err, database) => {
    if (err) return console.log(err);
    db = database;
    console.log(db);
  })
});

module.exports = router;
