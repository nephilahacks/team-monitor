
/* ===============================================================
    IMPORTS
=============================================================== */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


/* ===============================================================
    DECLARING MONGODB SCHEMA
=============================================================== */


var sprintSchema = new Schema ({
  index: {
    type: Number,
    default: 0
  },
  promised: {
    type: Number,
    default: 0
  },
  closed: {
    type: Number,
    default: 0
  },
  voters: [String],
});


var SprintSchema = mongoose.model('SprintSchema', sprintSchema, 'sprint');
module.exports = SprintSchema;
