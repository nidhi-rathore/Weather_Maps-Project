//jshint esversion:6

const express = require("express");
const https = require("https");


const app = express();
app.use(express.urlencoded(
    {extended: true }
));


app.get("/", function(req, res){

 res.sendFile(__dirname + "/index.html");   
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "cdde98fd56564e3596693c35c674bb8a";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

https.get(url, function(response){
    console.log(response.statusCode);

    
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<h1>The current temperature in " + query + " is " + temp + " degree Celsius.</h1>");
        res.write("<h3><em>The current weather conditions in " + query + " is " + weatherDescription +  ".</em></h3>");
        res.write("<img src=" + imageURL + ">");
        res.send();
        })
    })
})





app.listen(3000, function() {
    console.log("Server Port is running on 3000.");
})
