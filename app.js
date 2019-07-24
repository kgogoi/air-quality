var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var ejsLint = require("ejs-lint");
const PORT = process.env.PORT || 3000


app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
})

app.get("/results", function(req, res){
    var cityname = req.query.cityname;
    var countryname = req.query.countryname;
    var url = "http://api.weatherbit.io/v2.0/current/airquality?city=" + cityname + "&country=" + countryname + "&key=dfa2e737232144179436b13f2ba0bbe8";
    request(url, function(error, response, body){
        if(!error & response.statusCode == 200){
          var data = JSON.parse(body);
          res.render("results", {data: data});
        }
    });
});

app.listen(PORT);