// Import the model (burger.js) to use its database functions
let burger = require("../models/burger.js");

let express = require("express");

let router = express.Router();

// Create all our routes and set up logic within those routes where required
// GET request to get all the burger data 
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        let handlebarsObj = {
            burger: data
        };
        console.log(handlebarsObj);
        res.render("index", handlebarsObj);
    });
});

//POST route to post the GET request
router.post("/api/burger", function (req, res) {
    burger.insertOne(function (result) {
        res.json({ id: result.insertId });
    });
});

// PUT request to grab burger, make changes and save in the database
router.put("/api/burger/:id", function (req, res) {
    let condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.updateOne(function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// Export routes for server.js to use.
module.exports = router;