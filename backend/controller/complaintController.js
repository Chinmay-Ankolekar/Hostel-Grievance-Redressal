const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
const asyncWrapper=require('express-async-handler')
const jwtDecoder = require("../utils/jwtToken").jwtDecoder;
const jwt = require("jsonwebtoken");
const asyncWrapper = require('express-async-handler')
const {jwtGenerator, jwtDecoder} = require("../utils/jwtToken");
const { authorizeStudent }= require('../middleware/auth')


app.use(cors());
app.use(express.json());

const decodeStudent = async (token) => {
  try {
    // const token = req.headers.authorization;
    console.log("here", req.headers,token);
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    console.log(decodedToken)
    // if (decodedToken.user.type === "student") {
    //   return next();
    // } else {
    //  return res.status(403).json({ error: "Unauthorized for Student" });
    // }
    const { user_id, type } = decodedToken.user;

    if (type === "student") {
      
      const query = `
        SELECT student_id, room, block_id
        FROM student 
        WHERE student_id = $1
      `;

      const result = await db.pool.query(query, [user_id]);

      if (result.rows.length > 0) {
        studentInfo = result.rows[0];
      }
    }
    
    return null;
  } catch (err) {
    console.error("here11",err.message);
    // return res.status(401).json({ error: "Unauthorized" });
  }
};  

// const fetchStudentInfo = async (req, res, next) => {

//   try {
//     const { user_id, type } = req.userData;

//     if (type === "student") {
      
//       const query = `
//         SELECT student_id, room, block_id
//         FROM student 
//         WHERE student_id = $1
//       `;

//       const result = await db.pool.query(query, [user_id]);

//       if (result.rows.length > 0) {
//         studentInfo = result.rows[0];
//       }
//     }

//     req.studentInfo = studentInfo;
//     next();
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.postComplaints = asyncWrapper(async (req , res)=> {
    try {
      const token = req.headers.authorization;
      const studentInfo = await decodeStudent(token);
      
      if(studentInfo){
        const { student_id, room, block_id } = studentInfo;

        
      const { name,  category_id,
        assigned_worker_id, warden_id, 
       description, is_completed,
       assigned_at } = req.body;

        const query = `insert into complaint 
            (name, block_id, category_id,
            student_id, assigned_worker_id, warden_id, 
            description, room, is_completed, created_at,
            assigned_at) 
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *` ;

        const newComplaint = await db.pool.query(
          query,
          [name, block_id, null,
            student_id, null, null, 
            description, room, is_completed, new Date().toISOString(),
            null]
        );
        res.json(newComplaint.rows[0]);
      }else {
        res.status(401).json({ message: "Invalid user type or user not found" });
      }
      } catch (err) {
        console.log(err.message);
      }
}); 

exports.getAllComplaints = asyncWrapper(async(req, res)=> {
    try {
        const allComplaints = await db.pool.query("SELECT * FROM complaint");
        res.json(allComplaints.rows);
      } catch (err) {
        console.log(err.message);
      }
});

exports.getAllComplaintsByid = asyncWrapper(async(req, res) => {
    try {
        const { id } = req.params;
        const myComplaint = await db.pool.query(
          "SELECT * FROM complaint WHERE id = $1",
          [id]
        );
        res.json(myComplaint.rows);
      } catch (err) {
        console.log(err.message);
      }
});







