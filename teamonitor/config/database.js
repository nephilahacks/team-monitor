
/* -------------------------------------------------
	database configurations
----------------------------------------------------
*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');
var db = mongoose.connection;



