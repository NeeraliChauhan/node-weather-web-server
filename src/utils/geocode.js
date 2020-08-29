const request = require('request');

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibmVlcmFsaWNoYXVoYW4iLCJhIjoiY2tkcjNuZ3o3MDJhbjJ0cGtidHFpZ2cyNSJ9.7WeQC5manYsTO6TNR2atoA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!!", undefined);
    } else if (body.features.length === 0) {
      callback("Cannot find the location !!", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};


module.exports = geocode;