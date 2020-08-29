const request = require("request");

const forecast = (lat, long, callback) => {
const url =
  "http://api.weatherstack.com/current?access_key=638f73b32211cb2592d27b28a9504efc&query=" +
  lat +
  "," +
  long +
  "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if(error){
      callback('Unable to connect to weather service', undefined);
    } else if(body.error){
       callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature}, but it feels like ${body.current.feelslike} also its ${body.current.weather_descriptions[0]} here!`
      );
    }
  });
}

module.exports = forecast;
