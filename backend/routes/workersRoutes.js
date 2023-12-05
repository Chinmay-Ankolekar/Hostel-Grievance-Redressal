const express = require('express');
const workersRoutes = express.Router()

const {postWorkers, getWorkersByid } = require('../controller/workersontroller');

workersRoutes.route("/workers").post(postWorkers);

workersRoutes.route("/workers/:worker_id").get(getWorkersByid);

module.exports = workersRoutes


