
var admin = require("firebase-admin");
var serviceAccount = require(__dirname + "/ploupp-free-money-1249f-firebase-adminsdk-j6vh2-0a849c70d8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ploupp-free-money-1249f.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("users");
const port = 80;


var express = require('express');
var app = express();

app.get('/user/:uid', function (request, response) {

  var uid = request.params.uid;

if (uid != null) {
    ref.child(uid).once("value", function(snapshot) {
      console.log(snapshot.val());
      response.json(snapshot.val());

    });
} else {
  ref.once("value", function(snapshot) {
    console.log(snapshot.val());
    response.json(snapshot.val());

  });
}
});

app.get('/postback', function (request, response) {

    var offerId = request.query.offerId;
    var name = request.query.name;
    var currency = request.query.currency;
    var rate = request.query.rate;
    var sub1 = request.query.sub1;
    var status = request.query.status;
    var ip = request.query.ip;

      if (request.ip.indexOf('204.232.224.18') !== -1 || request.ip.indexOf('204.232.224.19') !== -1 || request.ip.indexOf('104.130.46.116') !== -1 || request.ip.indexOf('104.130.60.109') !== -1 || request.ip.indexOf('104.239.224.178') !== -1 || request.ip.indexOf('104.130.60.108') !== -1) {
        console.log(request.ip);


      }
      
      if (status == 1) {

        ref.child(sub1).child("point").transaction(function (current_value) {
          return (current_value || 0) + parseInt(currency);
        });

        response.end("success");
      }
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
