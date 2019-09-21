// Import the model (burger.js) to use its database functions
let burger = require("../models/burger.js");

let express = require("express");

let router = express.Router();

//Create all our routes and set up logic within those routes where required
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
router.post("/burger/insertOne", function (req, res) {
    burger.insertOne([
        "burger_name"
    ], [
            req.body.burger_name
    ],
        function (result) {
            res.json({id: result.insertId });
            
    });
});

// PUT request to grab burger, make changes and save in the database
//router.put("/burger/updateOne/:id", function (req, res) {
router.post("/burger/updateOne", function (req, res) {
    console.log(req.body.burgerid)
    
    let condition = "id = " + req.body.burgerid;

    burger.updateOne([
        "devoured"
    ], [
        condition
    ],
        function (result) {
            res.json({ id: result.insertId });

        });



    /*console.log("condition", condition);
    burger.updateOne(function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });*/
});
// Export routes for server.js to use.
module.exports = router;