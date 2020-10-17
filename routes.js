module.exports = (app, db) => {
  const myApp = require("./controllers/myApp")(db);

  // test node backend working
  app.get("/api/ping", myApp.ping);
  app.get("/api/users", myApp.getAllUsers);

  // user registration
  app.post("/api/users/new", myApp.createUser);

  // user login
  app.post("/api/users/login", myApp.login);

  // token authentication
  app.get("/api/users/auth", myApp.auth);

  // user logout
  app.get("/api/users/logout", myApp.logout);
};
