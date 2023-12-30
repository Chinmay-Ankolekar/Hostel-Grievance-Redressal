const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
const asyncWrapper=require('express-async-handler')

const jwt = require("jsonwebtoken");
const {jwtGenerator, jwtDecoder} = require("../utils/jwtToken");
const { authorizeStudent }= require('../middleware/auth')

app.use(cors());
app.use(express.json());

const decodeUser = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    console.log(decodedToken)
  
    const { user_id, type } = decodedToken.user;
    let userInfo;

    if (type === "student") {
      
      const query = `
        SELECT student_id, room, block_id
        FROM student 
        WHERE student_id = $1
      `;

      const result = await db.pool.query(query, [user_id]);
      console.log(result.rows);
      if (result.rows.length > 0) {
        userInfo = result.rows[0];
      }
    }

    if (type === "warden") {
      
      const query = `
        SELECT warden_id,  block_id
        FROM warden 
        WHERE warden_id = $1
      `;

      const result = await db.pool.query(query, [user_id]);

      if (result.rows.length > 0) {
        userInfo = result.rows[0];
      }
    }
    
    return userInfo;

  } catch (err) {
    console.error("here111",err.message);
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
      console.log(token);
      const userInfo = await decodeUser(token);
      
     
        const { student_id, block_id } = userInfo;

        
      const { name, 
       description, room, is_completed,
       assigned_at } = req.body;

        const query = `insert into complaint 
            (name, block_id, 
            student_id, 
            description, room, is_completed, created_at,
            assigned_at) 
            values ($1,$2,$3,$4,$5,$6,$7,$8) returning *` ;

        const newComplaint = await db.pool.query(
          query,
          [name, block_id,
            student_id, 
            description, room, false, new Date().toISOString(),
            null]
        );
        res.json(newComplaint.rows[0]);
      
      } catch (err) {
        console.log(err.message);
      }
}); 

// exports.getAllComplaints = asyncWrapper(async(req, res)=> {
//     try {
//         const allComplaints = await db.pool.query("SELECT * FROM complaint");
//         res.json(allComplaints.rows);
//       } catch (err) {
//         console.log(err.message);
//       }
// });

// exports.putComplaintsByid = asyncWrapper(async(req, res) => {
//   const token = req.headers.authorization;
//   const decodedToken = jwt.verify(token, process.env.JWTSECRET);
//     console.log(decodedToken)
//     const { user_id, type } = decodedToken.user;
//     try {
//       const { id } = req.params;
//       if (type === "warden") {
//         const result = await db.pool.query("UPDATE complaint SET is_completed = NOT is_completed WHERE id = $1 RETURNING *", [id]);

  
//         if (result.rows.length === 0) {
//           return res.status(404).json({ error: "Complaint not found" });
//         }
  
//       // const result = await db.pool.query(
//       //   "UPDATE complaint SET is_completed = $1 WHERE id = $2 RETURNING *",
//       //   [is_completed, id]
//       // );
        
//         // const myComplaint = await db.pool.query(
//         //   "SELECT * FROM complaint WHERE id = $1",
//         //   [id]
//         // );
//         // if (result.rows.length > 0) {
//           res.json(result.rows[0]);
//         } else {
//           res.status(404).json({ error: "Complaint not found" });
//         }
//       } catch (err) {
//         console.log(err.message);
//       }
// });

exports.putComplaintsByid = asyncWrapper(async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.JWTSECRET);
  console.log(decodedToken);
  const { user_id, type } = decodedToken.user;

  try {
    const { id } = req.params;

    if (type === "warden") {
      const result = await db.pool.query(
        "UPDATE complaint SET is_completed = NOT is_completed, assigned_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Complaint not found" });
      }

      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Complaint not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


exports.getAllComplaintsByUser = asyncWrapper(async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.JWTSECRET);
  console.log(decodedToken);

  const { user_id, type } = decodedToken.user;

  try {
    if (type === "warden") {
      const allComplaints = await db.pool.query("SELECT * FROM complaint ORDER BY created_at DESC");
      res.json(allComplaints.rows);
    } else if (type === "student") {
      const myComplaints = await db.pool.query(
        "SELECT * FROM complaint WHERE student_id = $1 ORDER BY created_at DESC",
        [user_id]
      );
      res.json(myComplaints.rows);
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.getUserType = asyncWrapper(async(req, res)=> {
  try{
  const token = req.headers.authorization;
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.JWTSECRET);
  console.log(decodedToken)
  const { type } = decodedToken.user;

  res.json({ userType: type });
  }  
 catch (err) {
  console.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
}
})

exports.getUserDetails = async(req, res) => {
  try{
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    console.log(decodedToken)
    const { user_id, type } = decodedToken.user;
    
    const { id } = req.params;

    console.log('Decoded Token:', decodedToken);

  
    console.log('User Type:', type);

   
    console.log('User ID:', user_id);

    if(type == 'student'){
      const studentDetails = await db.pool.query(`SELECT u.full_name, u.email, u.phone, s.usn, b.block_id, b.block_name, s.room
      FROM users u, student s, block b
      WHERE u.user_id = $1 AND u.user_id = s.student_id AND s.block_id = b.block_id` , [user_id]);
            res.json(studentDetails.rows)
    }
    if (type == 'warden'){
      const wardenDetails = await db.pool.query(`select u.full_name,u.email,u.phone
                                                  from users u 
                                                  where user_id=$1 `, [user_id]);
            res.json(wardenDetails.rows);
    }
  
    }  
   catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.deleteComplaints = async(req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    console.log(decodedToken)
    const { type } = decodedToken.user;
    const { id } = req.params;

    if(type == 'warden'){
      const deleteComplaint = await db.pool.query(`delete from complaint where id = $1`,[id]);
      // res.json("complaint deleted");
    }
  }catch(err){
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}