const express = require("express")
const fetch = require("node-fetch")
const bodyParser = require("body-parser")
const path = require('path');
const ejs = require("ejs")
const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const APIKey = process.env.APIKey;
const part = "alerts,minutely";


app.get('/', function (req, res) {
    res.render("home",{
        cities: [],
        search: ""
    })
})

app.post("/", async function (req, res){
    const cityNameSearch = decodeURIComponent(req.body.cityNameSearch);
    const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityNameSearch}&limit=3&appid=${APIKey}`
    const cityData = await fetch(geocodeUrl, {method: 'get'})
        .then(response => response.json());
    await res.render("home", {
        cities : cityData,
        search: cityNameSearch
    })
})
app.post('/autoFind/:lat/:lon', async function(req, res){
    const lat = req.params.lat;
    const lon = req.params.lon;
    const reverseGeocodeUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${APIKey}`
    const data = await fetch(reverseGeocodeUrl, {method: 'get'})
        .then(response => response.json())
    const cityName = data[0]['name'];
    const countryName = data[0].country;
    await res.redirect(307,`/city/?c=${cityName}&r=${countryName}&t=${lat}&n=${lon}`);

})
app.post("/city", async function (req, res){
    const city = decodeURIComponent(req.query.c);
    const country = decodeURIComponent(req.query.r);
    const lat = decodeURIComponent(req.query.t);
    const lon = decodeURIComponent(req.query.n);
    const units = "metric";
    const url = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon="+ lon + "&exclude=" + part + "&appid=" + APIKey + "&units=" + units;

    const data = await fetch(url, {method: 'get'})
        .then(response => response.json());
    const currentDate = new Date(data.current.dt * 1000);
    const currentWeather = data.current
    await res.render("city", {
        city: city,
        country: country,
        currentWeather: currentWeather,
        currentDate: currentDate,
        timezone: data.timezone,
        hourlyWeather: data.hourly,
        dailyWeather: data.daily
    })

})

const PORT  = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`)
})