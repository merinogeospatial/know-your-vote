var address = "clarksville tn";
var state;
var district;
var googleCivicObj;


// Access the .env file
require("dotenv").config();

// Access the keys.js file and set it to a variable
var keys = require("../keys.js");

var queryURL =
  "https://www.googleapis.com/civicinfo/v2/representatives?key=" +
  keys.googleCivic +
  "&address=" +
  address;

var request = require("request");

request(queryURL, { json: true }, (err, response) => {
  if (err) {
    return console.log(err);
  }
  // console.log(response.body);
  var division_id = Object.keys(response.body.divisions)[2];
  var congDist = response.body.divisions[division_id].name;

  // Office index to obtain the office name
  var officeIndex = response.body.divisions[division_id].officeIndices[0];
  // Office name
  var officeName = response.body.offices[officeIndex].name;
  // Official index to obtain the official's info
  var officialIndex = response.body.offices[officeIndex].officialIndices[0];

  // Create the state and district identifiers for db lookup
  state = response.body.normalizedInput.state;
  district = officeName.charAt(officeName.length - 1);

  googleCivicObj = {
    districtName: response.body.divisions[division_id].name,
    officeIndex: response.body.divisions[division_id].officeIndices[0],
    officeName: response.body.offices[officeIndex].name,
    officialName: response.body.officials[officialIndex].name,
    officialParty: response.body.officials[officialIndex].party,
    officialPhone: response.body.officials[officialIndex].phones[0],
    officialURL: response.body.officials[officialIndex].urls[0],
    imgURL: response.body.officials[officialIndex].urls[0]
  };

  console.log("THIS IS WHAT YOUR EXPORT WILL LOOK LIKE: ", googleCivicObj);

});

module.exports = googleCivicObj;
