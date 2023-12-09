const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
const asyncWrapper=require('express-async-handler')
app.use(cors());
app.use(express.json());

exports.postStudent = asyncWrapper(async(req, res)=>{
    try {
        const query = `insert into student 
                    ( student_id, block_id, usn, room )
                      values ($1,$2,$3,$4)
                      returning *` ;
    
        const { student_id, block_id, usn, room} = req.body;
    
          const student = await db.pool.query(
            query, 
              [student_id, block_id, usn, room]
          );
          res.json(student.rows[0]);
      } catch(err) {
        console.log(err.message);
      }$2
});

exports.getStudentByid = asyncWrapper(async(req, res)=> {
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
});