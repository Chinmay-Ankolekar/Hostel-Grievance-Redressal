const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
const asyncWrapper=require('express-async-handler')

app.use(cors());
app.use(express.json());

exports.postComplaints = asyncWrapper(async (req , res)=> {
    try {
        const query = `insert into complaint 
            (name, block_id, category_id,
            student_id, assigned_worker_id, warden_id, 
            description, room, is_completed, created_at,
            assigned_at) 
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *` ;
    
        const { name, block_id, category_id,
          student_id, assigned_worker_id, warden_id, 
          description, room, is_completed,
          assigned_at } = req.body;
        const newComplaint = await db.pool.query(
          query,
          [name, block_id, category_id,
            student_id, assigned_worker_id, warden_id, 
            description, room, is_completed, new Date().toISOString(),
            assigned_at]
        );
        res.json(newComplaint.rows[0]);
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







