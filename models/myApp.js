const mongo = require("mongodb");
const bcrypt = require("bcrypt");
const ObjectId = mongo.ObjectId;
require("dotenv").config();
const saltRounds = parseInt(process.env.SALT_ROUND);

module.exports = (db) => {
  let getAllUsers = (callback) => {
    db.collection("users")
      .aggregate([{ $project: { password: 0 } }])
      .toArray()
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        callback(err, null);
      });
  };

  let createNewUser = async (userInfo, callback) => {
    let usernameResult = await db
      .collection("users")
      .find({ username: userInfo.username })
      .toArray();

    try {
      if (usernameResult.length > 0) {
        callback(401, null);
      } else {
        // hashing password before storing into db
        bcrypt.hash(userInfo.password, saltRounds, (err, hash) => {
          if (err) {
            console.log("error in createUser model pw hashing", err);
            callback(500, null);
          } else {
            let hashedData = {
              username: userInfo.username,
              password: hash,
            };
            db.collection("users")
              .insertOne(hashedData)
              .then((res) => {
                callback(null, res.ops[0]);
              })
              .catch((err) => {
                console.log("err in createNewUser model", err);
                callback(500, null);
              });
          }
        });
      }
    } catch (err) {
      console.log("err in createNewUser model", err);
      callback(500, null);
    }
  };

  let userLogin = async (userLoginInfo, callback) => {
    let usernameResult = await db
      .collection("users")
      .find({ username: userLoginInfo.username })
      .toArray();

    // result returns true if the password matches
    try {
      bcrypt.compare(
        userLoginInfo.password,
        usernameResult[0].password,
        (err, result) => {
          if (err) {
            console.log("error in hashing pw", err);
            callback(500, null);
          } else {
            if (result) {
              let data = {
                username: usernameResult[0].username,
                id: usernameResult[0]._id,
                result,
              };
              callback(null, data);
            } else {
              callback(401, null);
            }
          }
        }
      );
    } catch (err) {
      callback(404, null);
    }
  };

  return {
    getAllUsers,
    createNewUser,
    userLogin,
  };
};
