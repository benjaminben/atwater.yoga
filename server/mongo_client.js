(function(){
  var client = require('mongodb').MongoClient,
      mongodb,
      db;
      module.exports = {
        connect: function(creds, callback) {
          var dburl = `mongodb+srv://${creds.user}:${creds.pw}@atwateryoga.ehm1w.mongodb.net/atwateryoga?retryWrites=true&w=majority`;
          client.connect(dburl,
            function(err, client){
              db = client.db('atwateryoga');
              if(callback) { callback(); }
            });
         },
        db: function() {
          return db;
        },
        close: function() {
          mongodb.close();
        }
      };
})();
