# Weatherly

## Porject Description
Weatherly is a Web Application i made using NodeJS and EJS, The project job is to show the Weather conditions for a city.

You can find Weather condition for a specific city using the search bar or by clicking on *Automatically detect my city* text under the search bar.


### For live testing the project please visit https://weatherly.cyclic.app/


## Used API
In this project i used 2 APIs to get data from.
1. [OpenWeatherMap Geocoding API](https://openweathermap.org/api/geocoding-api)
I used this API for my search bar, it's so easy to use and it's multilingual so even if you search for London in english or لندن in arabic it will get you the same result.

2. [OpenWeatherMap Onecall 3.0 API](https://openweathermap.org/api/one-call-3)
I used this API to get the weather conditions for my project.

## Usage
You can also run the project on your localhost by downloading the project files and running ```npm install``` to install the project packages and then run ```node index.js``` to run the project on your local host.

Keep in mind u need to set your APIKey in order to get Weather Conditions data from the API.


## Packages
I used 4 NodeJS packages in order to make this Project
1. Express
To make all the website routes and handle all of the post and get requests
2. node-fetch 
To fetch data from OpenWeatherMap API.
3. body-parser
To get some data from the post requests from EJS files.
4. EJS
A simple and useful framework to make it easier to design html files and also get data from the backend index.js file.
