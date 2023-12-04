const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
const asyncWrapper=require('express-async-handler')
app.use(cors());
app.use(express.json());

exports.postWarden = asyncWrapper(async (req, res)=> {
    try {
        const query = `insert into warden (
        name, password, phone, email) values
           ($1, $2, $3, $4) returning *`;
           
        const { name, password, phone, email} = req.body;
  
        const warden = await db.pool.query(
          query, [ name, password, phone, email]
        );
        res.json(warden.rows[0]);
    }catch(err) {
      console.log(err.message);
    }
});

exports.getWardenByid = asyncWrapper(async(req, res)=> {
    try {
        const {id} = req.params;
        const warden = await db.pool.query(
          "select * from warden where id = $1",
          [id]
        );
        res.json(warden.rows)
      } catch (err) {
        console.log(err.message);
      }
});