var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var connect = function(user, pw) {
  // Connection URL
  var url = 'mongodb://'+user+':'+pw+'@ds155080.mlab.com:55080/atwateryoga';

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db.close();
  });

  return MongoClient
}


module.exports = connect
