
/* ===============================================================
    IMPORTS
=============================================================== */

var mongoose        = require('mongoose');
var database        = require('../config/database');
var SprintSchema  = require('../models/sprint');
var VoteSchema  = require('../models/vote');

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

  var vote = new VoteSchema ({
    sprint: sprintid,
    votes: payload
  });

  SprintSchema.findOne({ 'index': sprintid }, function (err, sprint) {
    if (err) {
      cb(err, null, 500);
    } else {
      if (sprint) {
        vote.markModified('votes');
        vote.save(function (err, vote) {
          if (err) {
            cb(err, null, 500);
          } else {
            cb(null, vote, 201);
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

function sumVotes(sprint_id, cb) {
  VoteSchema.find({'sprint' : sprint_id}, function (err, votes) {
    sum = {
      "happy":[0,0,0,0,0,0,0,0],
      "neutral":[0,0,0,0,0,0,0,0],
      "unhappy":[0,0,0,0,0,0,0,0]
    };
    for (var i = 0 ; i < votes.length ; i++) {
      for (var j = 0 ; j < votes[i].votes.happy.length; j++) {
        sum.happy[j] += votes[i].votes.happy[j];
      }
      for (var j = 0 ; j < votes[i].votes.neutral.length; j++) {
        sum.neutral[j] += votes[i].votes.neutral[j];
      }
      for (var j = 0 ; j < votes[i].votes.unhappy.length; j++) {
        sum.unhappy[j] += votes[i].votes.unhappy[j];
      }
    }
    cb(sum);
  });
}

function query(query, cb) {
  SprintSchema.findOne(query, '-_id index voters', function (err, sprint) {
    if (err) {
      cb(err, null, 500);
    } else {
      if (sprint) {
        sumVotes(sprint.index, function(sum) {
          sprint_obj = sprint.toObject();
          sprint_obj['votes'] = sum;
          cb(null, sprint_obj, 200);
        });
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
