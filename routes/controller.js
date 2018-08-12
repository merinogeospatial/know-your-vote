// var express = require("express");

// var router = express.Router();

// // Create all our routes and set up logic within those routes where required.
// router.get("/api/address/:address", function(req, res) {
//   cat.all(function(data) {
   
//   });
// });



// function findMyRep(address) {
//     var googleCivic;
    
//       // Access the .env file
//     require("dotenv").config();
  
//     // Access the keys.js file and set it to a variable
//     var keys = require("../keys.js");
  
//     var queryURL =
//       "https://www.googleapis.com/civicinfo/v2/representatives?key=" +
//       keys.googleCivic +
//       "&address=" +
//       address;
  
//     var request = require("request");
  
//     request(queryURL, { json: true }, (err, response) => {
//       if (err) {
//         return console.log(err);
//       }
  
//       var division_id = Object.keys(response.body.divisions)[2];
  
//       googleCivicObj = {
//         districtName: response.body.divisions[division_id].name,
//         officeIndex: response.body.divisions[division_id].officeIndices[0],
//         officeName: response.body.offices[officeIndex].name,
//         officialName: response.body.officials[officialIndex].name,
//         officialParty: response.body.officials[officialIndex].party,
//         officialPhone: response.body.officials[officialIndex].phones[0],
//         officialURL: response.body.officials[officialIndex].urls[0],
//         state: response.body.normalizedInput.state,
//         district: this.officeName.charAt(officeName.length - 1),
//         imgURL: response.body.officials[officialIndex].urls[0]
//       };
  
//       console.log("THIS IS WHAT YOUR EXPORT WILL LOOK LIKE: ", googleCivicObj);
//   });
//     return "this is a test";
//   }
  

// // Export routes for server.js to use.
// module.exports = router;
