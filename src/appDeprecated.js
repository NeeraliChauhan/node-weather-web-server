// path is a core node module, no need to install
const path = require('path');
const express = require('express');

// __dirname is the directory name
// Define paths for express config
console.log(__dirname);
console.log(path.join(__dirname, '../public'));
const viewsPath = path.join(__dirname, '../templates/views');
// express is a function  
const app = express();

// to set up handlebar, dynamic content will be shared from the views folder
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

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

app.get('', (req, res)=> {
  res.render('index', {
    title: 'Weather App',
    name: 'Neerali Chauhan'
  });
})

app.get('/about', (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get('/help', (req, res)=> {
  res.render("help", {
    title: "Help",
    message: "This is section to help!"
  })
})


app.get('/weather', (req, resp)=> {
  resp.send('<h1>Weather</h1>');
})


// start the server and will listen to a specific port
app.listen(3000, ()=> {
  console.log('server is up on port 3000')
})