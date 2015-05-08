
/* =============================================================== 
    IMPORTS                                            
=============================================================== */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


/* =============================================================== 
    DECLARING MONGODB SCHEMA                                               
=============================================================== */


var animalSchema = new Schema ({

    age: {
        type: Number,
        default: 0
    },

    name: {
        type: String,
        default: 'unknown'
    },

});


var AnimalSchema = mongoose.model('AnimalSchema', animalSchema, 'animal');
module.exports = AnimalSchema;
