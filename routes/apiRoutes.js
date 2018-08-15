var db = require("../models");
var request = require("request");
require("dotenv").config();
var sequelize = require("sequelize");

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

  app.put("/yay/:state/:districts", function(req, res) {
    db.Districts.update(
      {
        yayCount: sequelize.literal("yayCount + 1")
      },
      {
        where: {
          STATE_ABBR: req.params.state,
          CDFIPS: req.params.districts
        }
      }
    ).then(function(votedb) {
      res.json(votedb);
    });
  });

  app.put("/nay/:state/:districts", function(req, res) {
    db.Districts.update(
      {
        nayCount: sequelize.literal("nayCount + 1")
      },
      {
        where: {
          STATE_ABBR: req.params.state,
          CDFIPS: req.params.districts
        }
      }
    ).then(function(votedb) {
      res.json(votedb);
    });
  });
};

//
// //============================================
// //notes//
// //find all and post for udating yay and nay count
// //fix update
// //============================================
// var db = require("../models");
// module.exports = function(app) {
//   // GET route for getting all of the districts
//   app.get("/", function(req, res) {
//     db.districts.findAll({}).then(function(votedb) {
//       res.json(votedb);
//     });
//   });
//   // Search for Specific rep then provides JSON
//   app.get("/api/districts", function(req, res) {
//     // If the user provides a specific rep in the URL
//     if (req.params.districts) {
//       // Then display the JSON for that rep.
//       db.districts
//         .findOne({
//           where: {
//             routeName: req.params.districts
//           }
//         })
//         .then(function(result) {
//           return res.json(result);
//         });
//     }
//   });
//   app.put("/api/districts", function(req, res) {
//     db.districts
//       .update(
//         {
//           text: req.body.text,
//           complete: req.body.complete
//         },
//         {
//           where: {
//             id: req.body.id
//           }
//         }
//       )
//       .then(function(votedb) {
//         res.json(votedb);
//       })
//       .catch(function(err) {
//         // Whenever a validation or flag fails, an error is thrown
//         // We can "catch" the error to prevent it from being "thrown", which could crash our node app
//         res.json(err);
//       });
//   });
//   //update for user yay/nay vote on bills
//   //May need some adjusting
//   app.put("/api/districts", function(req, res) {
//     db.Post.update(req.body, {
//       where: {
//         state: req.body.id,

//       }
//     }).then(function(votedb) {
//       res.json(votedb);
//     });
//   });
// };
