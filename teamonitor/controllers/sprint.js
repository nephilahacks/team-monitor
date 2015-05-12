
/* ===============================================================
    IMPORTS
=============================================================== */

var mongoose        = require('mongoose');
var database        = require('../config/database');
var SprintSchema  = require('../models/sprint');

/* ===============================================================
    CORE STUFF: SPRINT
=============================================================== */

function create(json, cb) {

  var sprint = new SprintSchema ({
    index: json.index,
  });

  SprintSchema.findOne({ 'index': json.index }, function (err, saved_sprint) {
    if (err) {
      cb(err, null, 500);
    } else {
      if (!saved_sprint) {
        if (sprint.votes.length == 0) {
          for (var i = 0 ; i < 8 ; i++) sprint.votes.push(0);
        }
        sprint.markModified('votes');
        sprint.save(function (err, sprint) {
          if (err) {
            cb(err, null, 500);
          } else {
            cb(null, sprint, 201);
          }
        });
      } else {
        cb(null, saved_sprint, 200);
      }
    }
  });
}

function vote(sprintid, payload, cb) {
  SprintSchema.findOne({ 'index': sprintid }, function (err, sprint) {
    if (err) {
      cb(err, null, 500);
    } else {
      if (sprint) {
        for (var i = 0 ; i < sprint.votes.length ; i++) {
          sprint.votes[i] = sprint.votes[i] + payload.votes[i]
        }
        sprint.markModified('votes');
        sprint.save(function (err, sprint) {
          if (err) {
            cb(err, null, 500);
          } else {
            cb(null, sprint, 200);
          }
        });
      } else {
        cb(
          {'error':'sprint ' + sprintid + ' doesn\'t exist'},
          null,
          404
        );
      }
    }
  });
}

function query(query, cb) {
  SprintSchema.findOne(query, '-_id index voters votes', function (err, sprint) {
    if (err) {
      cb(err, null, 500);
    } else {
      if (sprint) {
        cb(null, sprint, 200);
      } else {
        cb(
          {'error':'sprint with ' + JSON.stringify(query) + ' doesn\'t exist'},
          null,
          404
        );
      }
    }
  });
}

function all(cb) {
  SprintSchema.find({}, '-_id index voters votes', function (err, sprints) {
    if (err) {
      cb(err, null, 500);
    } else {
      if (sprints) {
        cb(null, sprints, 200);
      } else {
        cb({'error':'sprints don\'t exist'}, null, 404);
      }
    }
  });
}

/* ===============================================================
    EXPORTS
=============================================================== */

module.exports.create = create;
module.exports.vote = vote;
module.exports.query = query;
module.exports.all = all;
