//Import the ORM to create functions that will interact with the database
let orm = require("../config/orm.js");

let burger = {
    selectAll: function (callback) {
        orm.selectAll("burger", function (res) {
            callback(res);
        });
    },

    insertOne: function (cols, vals, callback) {
        orm.insertOne("burger", cols, vals, function (res) {
            callback(res);
        });
    },

    updateOne: function (objColVals, condition, callback) {
        orm.updateOne("burger", objColVals, condition, function (res) {
            callback(res);
        });
    }
    };
// Export the database functions for the controller (burgers_controllers.js).
module.exports = burger;



