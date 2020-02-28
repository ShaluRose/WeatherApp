//jshint esversion:6

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({encoded:true}));


app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");

    });
app.post("/", function(req, res){
  
  const query = req.body.cityName;
  const apiKey = "1f7e4c168d97034654204bec4984f08c&units=metric";
  const units = "metrics";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const name = weatherData.name;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
         res.write("<h1>The weather in "+name+" is "+temp+" degree Celcius.</h1>");
         res.write("<p>Weather description: "+desc+".</p>");
         res.write("<img src ="+ imageURL+">");
         res.send();

});


  });

});


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
