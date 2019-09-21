const connection = require("./connection.js");

//Helper function for SQL syntax to loops through, creates an array of question marks and turns it to string
function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++){
        arr.push("?")
    }
    return arr.toString();
}
//Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {

    let arr = [];

    // Loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            //arr.push(key + "=" + value);
            arr.push(value + "=" + 1);
        }
    }

    // Translate array of strings to a single comma-separated string
    return arr.toString();
}

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

    insertOne: function (tableInput, cols, vals, callback) {

        //console.log("here:");
        //console.log(printQuestionMarks(vals.length));
        //console.log("end");


        let queryString = "INSERT INTO " + tableInput;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },

    updateOne: function (tableInput, objColVals, condition, callback) {
        let queryString = "UPDATE " + tableInput;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    }
};

// Export the orm object for the model (burger.js)
module.exports = orm;