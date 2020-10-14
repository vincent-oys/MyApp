module.exports = (app, db) => {
    const myApp = require("./controllers/myApp")(db);

    app.get("/api/ping", myApp.ping)
}