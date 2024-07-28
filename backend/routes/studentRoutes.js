const express = require('express');
const studentRoutes = express.Router()
const { getStudentByid } = require('../controller/studentController');

studentRoutes.get("/student/:student_id",getStudentByid);

module.exports = studentRoutes