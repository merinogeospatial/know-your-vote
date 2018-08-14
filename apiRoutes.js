//============================================
//notes//


//find all and post for udating yay and nay count
//fix update 
//============================================


var db = require("../models");


module.exports = function (app) {
  // GET route for getting all of the districts
  app.get("/", function (req, res) {

    db.districts.findAll({}).then(function (votedb) {

      res.json(votedb);
    });
  });
  // Search for Specific rep then provides JSON
  app.get("/api/districts", function (req, res) {
    // If the user provides a specific rep in the URL
    if (req.params.districts) {
      // Then display the JSON for that rep.
      db.districts.findOne({
        where: {
          routeName: req.params.districts
        }
      }).then(function (result) {
        return res.json(result);
      });
    }
  });

  app.put("/api/districts", function (req, res) {

    db.districts.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (votedb) {
        res.json(votedb);
      })
      .catch(function (err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
  //update for user yay/nay vote on bills
  //May need some adjusting 

  app.put("/yay/:state/:districts", function (req, res) {
    db.districts.update({
      yayCount: sequelize.literal('yayCount + 1')
    }, {
        where: {
          state_abbr: req.params.state,
          cdfips: req.params.districts
        }
      })
      .then(function (votedb) {
        res.json(votedb);
      });

  });

  app.put("/nay/:state/:districts", function (req, res) {
    db.districts.update({
      nayCount: sequelize.literal('nayCount + 1')
    }, {
        where: {
          state_abbr: req.params.state,
          cdfips: req.params.districts
        }
      })
      .then(function (votedb) {
        res.json(votedb);
      });

  });

};

