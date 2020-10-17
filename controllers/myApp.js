const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

module.exports = (db) => {
  let modelFuncs = db.modelFuncsObj;

  let ping = (request, response) => {
    response.send("server up and running");
  };

  let getAllUsers = (request, response) => {
    modelFuncs.getAllUsers((err, res) => {
      if (err) {
        console.log(err.message);
        response.status(500).send("Error occurred - cannot get all users.");
      } else {
        response.status(200).send(res);
      }
    });
  };

  let createUser = (request, response) => {
    let newUserInfo = request.body;
    modelFuncs.createNewUser(newUserInfo, (err, res) => {
      if (err) {
        if (err === 500) {
          response.status(500).send("Error in DB");
        } else if (err === 401) {
          response.status(401).send("Username is taken");
        }
      } else {
        const payload = {
          username: res.username,
          userId: res.id,
        };
        const token = jwt.sign(payload, secret);
        response.cookie("token", token).send("Register & Token Created");
        console.log("Register & login successful");
      }
    });
  };

  let login = (request, response) => {
    let userLoginInfo = request.body;
    console.log("userLoginInfo", userLoginInfo);
    modelFuncs.userLogin(userLoginInfo, (err, res) => {
      if (err) {
        if (err === 401) {
          response.status(401).send("Invalid Password");
        } else if (err === 404) {
          response.status(404).send("Invalid Username");
        } else if (err === 500) {
          response.status(500).send("Error in DB");
        }
      } else {
        // issue token
        const payload = {
          username: res.username,
          userId: res.id,
        };
        // encode data into token
        const token = jwt.sign(payload, secret);
        response.cookie("token", token).status(200).send("Login success");
      }
    });
  };

  let auth = (request, response) => {
    let token = request.cookies.token;
    if (!token) {
      response.status(401).send("Please login");
    } else {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          res.status(403).send("Unauthorized");
        } else {
          const data = {
            username: decoded.username,
            userId: decoded.userId,
          };
          response.status(200).send(data);
        }
      });
    }
  };

  let logout = (request, response) => {
    response.clearCookie("token");
    response.status(200).send("Logout");
  };

  return {
    ping,
    getAllUsers,
    createUser,
    login,
    auth,
    logout,
  };
};
