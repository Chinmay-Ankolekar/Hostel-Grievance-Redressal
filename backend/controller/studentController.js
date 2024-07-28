const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
app.use(cors());
app.use(express.json());

exports.getStudentByid = async(req, res)=> {
    try {
        const {student_id} = req.params;
        const student = await db.pool.query(
          "select * from student where student_id = $1",
          [student_id]
        );
        res.json(student.rows)
      } catch (err) {
        console.log(err.message);
      }
};