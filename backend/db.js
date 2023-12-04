const Pool = require("pg").Pool;
const pg = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "example",
  port: 5432,
  database: "hostel",
});

pool.on("error", (error, client) => {
  console.log(error);
});

async function initDatabase() {

  const complaint = `CREATE TABLE if not exists complaint (
    id SERIAL PRIMARY KEY,
    name text ,
    block_id int ,
    category_id int ,
    student_id int,
    assigned_worker_id int,
    warden_id int,
    description VARCHAR(40),
    room VARCHAR(20),
    is_completed BOOLEAN,
    created_at timestamp,
    assigned_at timestamp
    );`

  const student = `create table if NOT EXISTS student (
    id SERIAL primary key,
    block_id int,
    usn varchar(20),
    first_name varchar(20),
    last_name varchar(20),
    password varchar(20),
    email varchar,
    phone varchar(10),
    sr_no varchar(10),
    grad_year int,
    room varchar(20)
);`

const warden = `create table if not EXISTS warden (
  id serial primary key,
  name text,
  password varchar(20),
  phone varchar(10),
  email varchar
);`

const workers = `CREATE table if not EXISTS workers (
  id serial primary key,
  category_id int,
  name text,
  password varchar(20),
  phone varchar(10),
  email varchar
); `
    
  await pool.query(complaint);
  await pool.query(student);
  await pool.query(warden);
  await pool.query(workers);
}

module.exports = {
  pool,
  initDatabase,
};
