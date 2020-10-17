module.exports = (app, db) => {
  const myApp = require("./controllers/myApp")(db);

  // test node backend working
  app.get("/api/ping", myApp.ping);

  // // user registration
  app.post("/api/users/new", myApp.createUser);

  // // user login
  app.post("/api/users/login", myApp.login);

  app.get("/api/users", myApp.getAllUsers);
};
