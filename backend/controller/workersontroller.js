const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
const asyncWrapper=require('express-async-handler')

app.use(cors());
app.use(express.json());

exports.postWorkers = asyncWrapper(async(req, res) => {
    try {
        const query = `insert into workers (
         category_id,  name, password, phone, email) values
           ($1, $2, $3, $4, $5) returning *`;
           
        const {category_id,  name, password, phone, email} = req.body;
  
        const workers = await db.pool.query(
          query, [ category_id,  name, password, phone, email]
        );
        res.json(workers.rows[0]);
    }catch(err) {
      console.log(err.message);
    }
  });

  exports.getWorkersByid = asyncWrapper(async(req, res)=> {
    try {
        const {id} = req.params;
        const workers = await db.pool.query(
          "select * from warden where id = $1",
          [id]
        );
        res.json(workers.rows)
      } catch (err) {
        console.log(err.message);
      }
  });