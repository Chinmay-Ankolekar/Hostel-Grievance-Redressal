const express = require("express");
const userRoutes = express.Router();

const { userRegister, userLogin } = require('../controller/userController')
const { authorizeWarden, authorizeStudent, authorizeWorker, authorizeComplaintRoute } = require('../middleware/auth')

userRoutes.route("/register").post(userRegister);

userRoutes.route("/login").post(userLogin);

userRoutes.route("/warden").get(authorizeWarden, (req, res) => {
    res.json({ message: "This route is accessible by wardens only." });
  });
  
  userRoutes.route("/worker").get(authorizeWorker, (req, res) => {
    res.json({ message: "This route is accessible by workers only." });
  });
  
  userRoutes.route("/student").get(authorizeStudent, (req, res) => {
    res.json({ message: "This route is accessible by students only." });
  });

  userRoutes.route("/complaint").get(authorizeComplaintRoute, (req, res) => {
    res.json({ message: "Common route for complaints." });
  });

module.exports = userRoutes