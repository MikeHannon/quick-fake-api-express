//Standard express setup
var express=require('express'),
app = express(),
path = require('path');
var faker = require('faker');


require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

/* The code below is set to run when the server loads and generate some fake data */

var User = require('./server/controllers/users.js');
for (var i = 0; i < 3; i ++){
  User.createData(faker.helpers.createCard(), function() {});
}

app.listen(8000, function() {});
