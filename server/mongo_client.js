(function(){
  var client = require('mongodb').MongoClient,
      mongodb;

      module.exports = {
        connect: function(creds, callback) {
          var dburl = `mongodb://${creds.user}:${creds.pw}@ds155080.mlab.com:55080/atwateryoga`;
          client.connect(dburl,
            function(err, db){
              mongodb = db;
              if(callback) { callback(); }
            });
         },
        db: function() {
          return mongodb;
        },
        close: function() {
          mongodb.close();
        }
      };
})();
