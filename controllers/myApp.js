const { response } = require("express");

module.exports = (db) => {
    let modelFuncs = db.modelFuncsObj;

    let ping = (request, response) => {
        response.send('server up and running');
    };

    return {
        ping
    }
}