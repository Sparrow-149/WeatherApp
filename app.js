const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function (req, res) {
    const query = req.body.cityName;
    const apikey = "********************************";  // your api key here
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apikey;

    https.get(url, function(response){

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherdesc = weatherData.weather[0].description;
            const locationname = weatherData.name;
           const icon = weatherData.weather[0].icon;
           const iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            // console.log("The tempreture is " + temp + " degrees");
            // console.log("The weather is currently " + weatherdesc);
            
            res.write("<div><p>The tempreture in <strong> " + locationname + " </strong> is <strong>" + temp + "</strong> degrees Celcius</p></div>" + "<div><p>The weather is currently <strong>" + weatherdesc + "</strong></p></div>");
            res.write('<img src = ' + iconurl + '>');
            
            res.send();
        });

    });
}); 


app.listen(3000, function () {
   console.log('Server listening on port 3000!'); 
});
