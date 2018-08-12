var db = require("../models");
var request = require("request");
require("dotenv").config();

// Access the keys.js file and set it to a variable
var keys = require("../keys.js");

module.exports = function(app) {
  // Get all districts from MySQL for map
  app.get("/api/districts", function(req, res) {
    db.Districts.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Get user's address and run Google Civic API
  app.get("/api/address/:address", function(req, res) {
    request({
      uri:
        "https://www.googleapis.com/civicinfo/v2/representatives?key=" +
        keys.googleCivic +
        "&address=" +
        req.params.address
    }).pipe(res);
  });

  // Get user's address and run Google Civic API
  app.get("/api/sessions", function(req, res) {
    request({
      uri: "https://api.propublica.org/congress/v1/house/votes/recent.json",
      headers: keys.proPublica
    }).pipe(res);
  });

  app.get("/api/sessions/:index", function(req, res) {
    baseURL =
      "https://api.propublica.org/congress/v1/115/house/sessions/2/votes/";
    request({
      uri: baseURL + req.params.index,
      headers: keys.proPublica
    }).pipe(res);
  });
};
