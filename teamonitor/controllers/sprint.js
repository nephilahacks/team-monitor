
/* ===============================================================
    IMPORTS
=============================================================== */

var mongoose        = require('mongoose');
var database        = require('../config/database');
var SprintSchema  = require('../models/sprint');

/* ===============================================================
    CORE STUFF: SPRINT
=============================================================== */

function create(json, res) {

    var sprint = new SprintSchema ({
        index: json.index,
    });

    SprintSchema.findOne({ 'index': json.index }, function (err, saved_sprint) {
        if (err) {
            res.send({'error': err});
        } else {
            if (!saved_sprint) {
                sprint.save(function (err, sprint) {
                    if (err) {
                        res.send({'error': err});
                    } else {
                        res.send(sprint);
                    }
                });
            } else {
                res.send(saved_sprint);
            }
        }
    });
}

/* ===============================================================
    EXPORTS
=============================================================== */

module.exports.create = create;
