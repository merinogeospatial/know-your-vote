var db = require("../models");
var request = require("request");
require("dotenv").config();

// Access the keys.js file and set it to a variable
var keys = require("../keys.js");
var googleCivicObj;

module.exports = function(app) {
  // Get all examples
  app.get("/api/districts", function(req, res) {
    db.Districts.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  // app.get("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Process user's address
//   app.get("/api/address/:address", function(req, res) {
//     findMyRep(req.params.address).then(function(
//       response
//     ) {
//       res.json(response);
//     });
//   });
// };

app.get("/api/address/:address", function(req, res) {
  return res.json(findMyRep(req.params.address, function() {
    return googleCivicObj;
  }));
});


function findMyRep(address) {
  
  var queryURL =
    "https://www.googleapis.com/civicinfo/v2/representatives?key=" +
    keys.googleCivic +
    "&address=" +
    address;

  request(queryURL, { json: true }, (err, response) => {
    if (err) {
      return console.log(err);
    }

    var division_id = Object.keys(response.body.divisions)[2];
    var officeIndex = response.body.divisions[division_id].officeIndices[0];
    var officeName = response.body.offices[officeIndex].name;
    var officialIndex = response.body.offices[officeIndex].officialIndices[0];

    googleCivicObj = {
      districtName: response.body.divisions[division_id].name,
      officeIndex: response.body.divisions[division_id].officeIndices[0],
      officeName: response.body.offices[officeIndex].name,
      officialName: response.body.officials[officialIndex].name,
      officialParty: response.body.officials[officialIndex].party,
      officialPhone: response.body.officials[officialIndex].phones[0],
      officialURL: response.body.officials[officialIndex].urls[0],
      state: response.body.normalizedInput.state,
      district: officeName.charAt(officeName.length - 1),
      imgURL: response.body.officials[officialIndex].urls[0]
    };

    console.log("THIS IS WHAT YOUR EXPORT WILL LOOK LIKE: ", googleCivicObj);
});
  return "we need to handle this async problem man!";
}}

