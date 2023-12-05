const express = require('express');
const studentRoutes = express.Router()

const { postStudent, getStudentByid } = require('../controller/studentController');

studentRoutes.route("/student").post(postStudent);

studentRoutes.route("/student/:student_id").get(getStudentByid);

module.exports = studentRoutes