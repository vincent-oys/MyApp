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
              journal: [],
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

  let addNewJournal = (newJournal, userId, callback) => {
    db.collection("journal")
      .insertOne(newJournal)
      .then((res) => {
        db.collection("users")
          .updateOne(
            { _id: ObjectId(userId) },
            { $push: { journal: res.insertedId } }
          )
          .then((res2) => {
            console.log("res2", res2);
            callback(null, res2);
          })
          .catch((err2) => {
            console.log("err2", err2);
            callback(err, null);
          });
      })
      .catch((err) => {
        console.log(err);
        callback(err, null);
      });
  };

  let updateJournal = (updatedInfo, journalId, callback) => {
    db.collection("journal")
      .updateOne({ _id: ObjectId(journalId) }, { $set: updatedInfo })
      .then((res) => {
        console.log(res);
        callback(null, res);
      })
      .catch((err) => {
        console.log(err);
        callback(err, null);
      });
  };

  let deleteJournal = (journalId, callback) => {
    db.collection("users")
      .updateMany(
        {},
        { $pull: { journal: ObjectId(journalId) } },
        { multi: true }
      )
      .then((res) => {
        db.collection("journal")
          .deleteOne({ _id: ObjectId(journalId) })
          .then((res) => {
            callback(null, res);
          })
          .catch((err) => {
            callback(err, null);
          });
      })
      .catch((err) => {
        callback(err, null);
      });
  };

  let getSingleJournal = (journalId, callback) => {
    db.collection("journal")
      .findOne({ _id: ObjectId(journalId) })
      .then((res) => {
        console.log(res);
        callback(null, res);
      })
      .catch((err) => {
        console.log(err);
        callback(err, null);
      });
  };

  let getAllJournal = async (userId, callback) => {
    db.collection("users")
      .findOne({ _id: ObjectId(userId) })
      .then((res) => {
        let journalsId = res.journal;
        let allQueries = [];

        if (journalsId) {
          journalsId.forEach((id) => {
            allQueries.push(
              db
                .collection("journal")
                .findOne({ _id: ObjectId(id) })
                .then((res) => {
                  return res;
                })
                .catch((err) => console.log(err))
            );
          });
        }
        return Promise.all(allQueries);
      })
      .then((res1) => {
        console.log(res1);
        callback(null, res1);
      })
      .catch((err) => console.log(err));
  };

  return {
    getAllUsers,
    createNewUser,
    userLogin,
    addNewJournal,
    updateJournal,
    deleteJournal,
    getSingleJournal,
    getAllJournal,
  };
};
