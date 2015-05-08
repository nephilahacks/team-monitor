
/* =============================================================== 
    IMPORTS                                            
=============================================================== */

var mongoose        = require('mongoose');
var database        = require('../config/database'); 
var AnimalSchema  = require('../models/animal');

/* =============================================================== 
    CORE STUFF: ANIMAL                                       
=============================================================== */

function create(json) {

        var animal = new AnimalSchema ({
            age: json.age,
            name: json.name,
        });

        animal.save(function (err, newapp) {
            if (err) { 
                console.error('error');
            } else {
                console.dir(newapp);
            }
        });
}

/* =============================================================== 
    EXPORTS                                
=============================================================== */
 
module.exports.create = create;
