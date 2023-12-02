const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./db");


app.use(cors());
app.use(express.json());


app.post("/complaints", async (req, res)=> {
    try {
      const {complaint_description} = req.body;
      const newComplaint = await db.pool.query(
        "INSERT INTO complaint (complaint_description) VALUES($1) RETURNING *",[complaint_description]
      );
      res.json(newComplaint.rows[0]);
    } catch(err) {
       console.log(err.message);
    }
});

app.get("/complaints", async(req,res)=>{
    try {
       const allComplaints = await db.pool.query("SELECT * FROM complaint")
       res.json(allComplaints.rows)
    }catch(err) {
        console.log(err.message);
     }
});

app.get("/complaints/:id", async (req,res )=> {
    try {
        const {id} = req.params;
        const myComplaint = await db.pool.query("SELECT * FROM complaint WHERE complaint_id = $1", [id])
        res.json(myComplaint.rows)
    }catch(err) {
        console.log(err.message);
     }
});

app.listen(3000, () => {
    db.initDatabase()
    console.log("listening")
})
