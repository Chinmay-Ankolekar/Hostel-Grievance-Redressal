const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const complaintRoutes = require("./routes/complaintRoutes");
const studentRoutes = require("./routes/studentRoutes");
const wardenRoutes = require("./routes/wardenRoutes");
const workersRoutes = require("./routes/workersRoutes");
const userRoutes = require("./routes/userRoutes");
const { authorizeWarden, authorizeWorker, authorizeStudent } = require("./middleware/auth");

app.use(cors());
app.use(express.json());

app.use('/', complaintRoutes);
app.use('/', studentRoutes)
app.use('/', wardenRoutes)
app.use('/', workersRoutes)
app.use('/', userRoutes)

app.use('/students', authorizeStudent, studentRoutes); 
app.use('/wardens', authorizeWarden, wardenRoutes); 
app.use('/workers', authorizeWorker, workersRoutes); 



// app.post("/complaints", async (req, res) => {
//   try {
//     const query = `insert into complaint 
//         (name, block_id, category_id,
//         student_id, assigned_worker_id, warden_id, 
//         description, room, is_completed, created_at,
//         assigned_at) 
//         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *` ;

//     const { name, block_id, category_id,
//       student_id, assigned_worker_id, warden_id, 
//       description, room, is_completed,
//       assigned_at } = req.body;
//     const newComplaint = await db.pool.query(
//       query,
//       [name, block_id, category_id,
//         student_id, assigned_worker_id, warden_id, 
//         description, room, is_completed, new Date().toISOString(),
//         assigned_at]
//     );
//     res.json(newComplaint.rows[0]);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// app.get("/complaints", async (req, res) => {
//   try {
//     const allComplaints = await db.pool.query("SELECT * FROM complaint");
//     res.json(allComplaints.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// app.get("/complaints/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const myComplaint = await db.pool.query(
//       "SELECT * FROM complaint WHERE id = $1",
//       [id]
//     );
//     res.json(myComplaint.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// app.post("/student", async (req,res) => {
//   try {
//     const query = `insert into student 
//                 (block_id, usn, first_name,
//                   last_name, password, email,
//                   phone, sr_no, grad_year, room )
//                   values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
//                   returning *` ;

//     const { block_id, usn, first_name,
//       last_name, password, email,
//       phone, sr_no, grad_year, room } = req.body;

//       const student = await db.pool.query(
//         query, 
//           [block_id, usn, first_name,
//             last_name, password, email,
//             phone, sr_no, grad_year, room]
//       );
//       res.json(student.rows[0]);
//   } catch(err) {
//     console.log(err.message);
//   }
// });

// app.get("/student/:id", async (req, res)=> {
//   try {
//     const {id} = req.params;
//     const student = await db.pool.query(
//       "select * from student where id = $1",
//       [id]
//     );
//     res.json(student.rows)
//   } catch (err) {
//     console.log(err.message);
//   }
// })

// app.post("/warden", async(req,res) => {
//   try {
//       const query = `insert into warden (
//       name, password, phone, email) values
//          ($1, $2, $3, $4) returning *`;
         
//       const { name, password, phone, email} = req.body;

//       const warden = await db.pool.query(
//         query, [ name, password, phone, email]
//       );
//       res.json(warden.rows[0]);
//   }catch(err) {
//     console.log(err.message);
//   }
// })

// app.get("/warden/:id", async (req, res)=> {
//   try {
//     const {id} = req.params;
//     const warden = await db.pool.query(
//       "select * from warden where id = $1",
//       [id]
//     );
//     res.json(warden.rows)
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// app.post("/workers", async(req,res) => {
//   try {
//       const query = `insert into workers (
//        category_id,  name, password, phone, email) values
//          ($1, $2, $3, $4, $5) returning *`;
         
//       const {category_id,  name, password, phone, email} = req.body;

//       const workers = await db.pool.query(
//         query, [ category_id,  name, password, phone, email]
//       );
//       res.json(workers.rows[0]);
//   }catch(err) {
//     console.log(err.message);
//   }
// })

// app.get("/workers/:id", async (req, res)=> {
//   try {
//     const {id} = req.params;
//     const workers = await db.pool.query(
//       "select * from warden where id = $1",
//       [id]
//     );
//     res.json(workers.rows)
//   } catch (err) {
//     console.log(err.message);
//   }
// });

app.listen(3000, () => {
  db.initDatabase();
  console.log("listening");
});
