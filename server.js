var express = require('express');
var cors = require('cors');
var app = express();
var request = require('request');
var path = require('path');
var server = require('http').createServer(app);
var PORT = process.env.PORT || 3000;

// define the path to use style sheets & images - public folder
app.use(express.static(path.join(__dirname, '/public')));

app.use(cors());
app.options('*', cors());

var center_of_austin = {
    lat: 30.267,
    lng: -97.743
}

function generateBrewAPIUrl(lat, lng) {
    return "https://api.brewerydb.com/v2/search/geo/point/?lat=" + lat + "&lng=" + lng + "&key=52840d61aed0d4d4dc14a975bf3092c4&format=json";
}


app.get('/', function(req, res, next) {
    // https://codeforgeek.com/2015/01/render-html-file-expressjs/
    // res.sendFile(path.join(__dirname + '/public/brew.html'))
    console.log('an example of how to serve a file');
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get('/breweries', function(req, res, next) {
    // https://stackoverflow.com/questions/8515872/simple-api-calls-with-node-js-and-express

    let lat = req.query.lat;
    let lng = req.query.lng;
    if (!lat || !lng) {
        // console.log('didnt get nuttin');
        // console.log(lat);
        // console.log(lng);
        var url = generateBrewAPIUrl(center_of_austin.lat, center_of_austin.lng);
    } else {
        var url = generateBrewAPIUrl(lat, lng);
    }
    console.log('url');
    console.log(url);
    // let url = generateBrewAPIUrl(centerLat, centerLong);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // https://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express
          res.json(body);
      } else {
          res.send(error);
      }
    });

})

// required if you wanna serve a file
// app.use(express.static(__dirname + '/public'));
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
// server.listen(3000);
// console.log("--------------------------------");
// console.log("Connected to Brewery App Server");
// console.log('');
// console.log("Keep this server running to allow functionability with the app.\n If the server is not running the API will not work.\n No connection = no dropped pins.");
