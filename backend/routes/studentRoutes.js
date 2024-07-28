const express = require('express');
const studentRoutes = express.Router()

const { getStudentByid } = require('../controller/studentController');


studentRoutes.route("/student/:student_id").get(getStudentByid);

module.exports = studentRoutes