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
                    (block_id, usn, first_name,
                      last_name, password, email,
                      phone, sr_no, grad_year, room )
                      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
                      returning *` ;
    
        const { block_id, usn, first_name,
          last_name, password, email,
          phone, sr_no, grad_year, room } = req.body;
    
          const student = await db.pool.query(
            query, 
              [block_id, usn, first_name,
                last_name, password, email,
                phone, sr_no, grad_year, room]
          );
          res.json(student.rows[0]);
      } catch(err) {
        console.log(err.message);
      }
});

exports.getStudentByid = asyncWrapper(async(req, res)=> {
    try {
        const {id} = req.params;
        const student = await db.pool.query(
          "select * from student where id = $1",
          [id]
        );
        res.json(student.rows)
      } catch (err) {
        console.log(err.message);
      }
});