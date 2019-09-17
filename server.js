const exphbs = require("express-handlebars");
const express = require("express");
const mysql = require("mysql");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlenconded({ extended: true }));
app.use(express.joson());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function () {
    console.log("Server Listening on: http://localhost" + PORT);
})