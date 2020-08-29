// path is a core node module, no need to install
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
// __dirname is the directory name
// Define paths for express config
console.log(__dirname);
console.log(path.join(__dirname, "../public"));
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// express is a function
const app = express();

// to set up handlebar, dynamic content will be shared from the views folder
// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

// static requires an absolute path that it can serve
// this will be served when we dont have a specific route so line so this is useless now
//get function determines what to send when a user tries to access a specific route.
// app.get('', (req, resp)=> {
//   // send function will return this to whoever send requests
//   resp.send('Hello Express!!')
// });

// we have a website app.com that has pages app.com/help, app.com/about.
// app.com is domain that has multiple routes and this web app will run on a single express server.

// we can send html, json, array

// app.get('/help', (req, resp)=> {
//   resp.send([
//     { name: "Ritesh Chauhan", age: 23 },
//     { name: "Neerali Chauhan", age: 26 },
//   ]);
// })

// app.get('/about', (rq, resp)=> {
//   resp.send({
//     name: 'Neerali',
//     age: 26
//   });
// })

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Neerali Chauhan",
  });
});


app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: 'Neerali Chauhan'
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is section to help!",
    name: "Neerali Chauhan"
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: "Please provide an address!"
    })
  }
  geocode(req.query.address, (error, {lat, long, location}={})=> {
    if(error){
      return res.send({ error })
    }
    forecast(lat, long, (error, forecast)=> {
      if(error){
        return res.send({error})
      }
      res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
  })
}); 



app.get('/help/*', (req, res)=> {
  res.render("404", {
    title: "404",
    name: 'Neerali Chauhan',
    errorMessage: "Help article not found!"
  })
})
// * is wild card character means match anything thats not been matched so far

/* this route need to come last as express will start looking from te top to match routes. 
If we write it at the begining it will match it with the * and render the required */
app.get('*',(req, res)=> {
  res.render("404", {
    title: "404",
    name: "Neerali Chauhan",
    errorMessage: "Page not found!!"
  })
})

// start the server and will listen to a specific port
app.listen(3000, () => {
  console.log("server is up on port 3000");
});

// this command will tell the server to monitor changes in the files with these extentions and restart
// nodemon sr/app.js -e js,hbs