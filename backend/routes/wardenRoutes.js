const express = require('express');
const wardenRoutes = express.Router()
const {  getWardenByid } = require('../controller/wardenController');

wardenRoutes.get("/warden/:warden_id",getWardenByid);

module.exports = wardenRoutes