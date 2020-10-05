// Creating the "express" server & setting inital port

const express = require("express");
const { dirname } = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

//Sets up the express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public")) //when something static is displayed look in public file for it, just showing HTML(ex home page)

//Router Map
require("./routes/apiRoutes")(app); //pass in express function if file is there
require("./routes/htmlRoute")(app);

//Listener
//passing in request from user or response from server
app.listen(PORT, function(req, res) {
    console.log("App listening on PORT" + PORT);
});