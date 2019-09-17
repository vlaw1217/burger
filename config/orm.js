const connection = require("./connection.js");

let orm = {

    selectAll: function (tableInput, callback) {
        let queryString = "SELECT * FROM " + tableInput
            + ";"; connection.query(queryString, function (err, result) {
                if (err) {
                    throw err;
                }
                callback(result)
            });
    },





}


module.exports = orm;