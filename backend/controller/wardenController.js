const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");

app.use(cors());
app.use(express.json());

exports.getWardenByid = async(req, res)=> {
    try {
        const {warden_id} = req.params;
        const warden = await db.pool.query(
          "select * from warden where warden_id = $1",
          [warden_id]
        );
        res.json(warden.rows)
      } catch (err) {
        console.log(err.message);
      }
};