
/* ===============================================================
    IMPORTS
=============================================================== */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


/* ===============================================================
    DECLARING MONGODB SCHEMA
=============================================================== */


var voteSchema = new Schema ({
  sprint: Number,
  votes: {happy:[Number], neutral:[Number], unhappy:[Number]},
});


var VoteSchema = mongoose.model('VoteSchema', voteSchema, 'vote');
module.exports = VoteSchema;
