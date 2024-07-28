const express = require('express');
const wardenRoutes = express.Router()

const {  getWardenByid } = require('../controller/wardenController');

wardenRoutes.route("/warden/:warden_id").get(getWardenByid);

module.exports = wardenRoutes