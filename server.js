const exphbs = require("express-handlebars");
const express = require("express");
//const mysql = require("mysql");

const app = express();

const PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
let routes = require("./controllers/burgers_controllers.js");
app.use(routes);

app.listen(PORT, function () {
    console.log("Server Listening on: http://localhost " + PORT);
})