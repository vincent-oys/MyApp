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

  // add journal
  app.post("/api/journal/:userid/add", myApp.addJournal);

  // edit journal
  app.put("/api/journal/:journalid/edit", myApp.editJournal);

  // delete journal
  app.delete("/api/journal/:journalid/delete", myApp.deleteJournal);

  // get single journal
  app.get("/api/journal/:journalid", myApp.getSingleJournal);

  // // get all journal
  app.get("/api/journal/:userid/summary", myApp.getAllJournal);
};
