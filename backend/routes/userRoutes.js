const express = require("express");
const userRoutes = express.Router();

const { userRegister, userLogin } = require('../controller/userController');
const { authorizeWarden, authorizeStudent, authorizeComplaintRoute } = require('../middleware/auth');

userRoutes.post("/register", userRegister);

userRoutes.post("/login", userLogin);

userRoutes.get("/warden", authorizeWarden, (req, res) => {
  res.json({ message: "This route is accessible by wardens only." });
});

userRoutes.get("/student", authorizeStudent, (req, res) => {
  res.json({ message: "This route is accessible by students only." });
});

userRoutes.get("/complaint", authorizeComplaintRoute, (req, res) => {
  res.json({ message: "Common route for complaints." });
});

module.exports = userRoutes;
