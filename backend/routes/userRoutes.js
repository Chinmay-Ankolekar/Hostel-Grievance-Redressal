const express = require("express");
const userRoutes = express.Router();

const { userRegister, userLogin } = require('../controller/userController');

userRoutes.post("/register", userRegister);

userRoutes.post("/login", userLogin);

module.exports = userRoutes;
