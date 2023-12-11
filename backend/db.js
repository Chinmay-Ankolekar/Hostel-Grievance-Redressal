const Pool = require("pg").Pool;
const pg = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "chinmay.1221",
  host: "localhost",
  port: 5432,
  database: "hostel"
});

pool.on("error", (error, client) => {
  console.log(error);
});

async function initDatabase() {

  const users = `create table if not exists users (
    user_id serial primary key not null,
    full_name text not null,
    email text not null,
    phone text not null,
    password text not null,
    type text not null
);
`
  const block = `
  create table if not exists block (
      block_id serial primary key not null,
      block_name text not null
  );`

  const student = `create table if not exists student (
    student_id int primary key not null,
    block_id int,
    usn text ,
    room text,
    foreign key (student_id) references users(user_id) on delete cascade,
    foreign key (block_id) references block(block_id) on delete cascade
);`

const warden = `create table if not exists warden (
  warden_id int primary key not null,
  block_id int,
  foreign key (warden_id) references users(user_id) on delete cascade,
  foreign key (block_id) references block(block_id)
  on delete cascade
);`

const category = `create table if not exists category (
  category_id serial primary key not null,
  category_name text
);`

const workers = `create table if not exists workers (
  worker_id int primary key not null,
  category_id int,
  foreign key (worker_id) references users(user_id) on delete cascade,
  foreign key (category_id) references category(category_id) on delete cascade
);`


  const complaint = `create table if not exists complaint (
    id SERIAL PRIMARY KEY,
    name text ,
    block_id int,
    category_id int ,
    student_id int ,
    assigned_worker_id int,
    warden_id int ,
    description text,
    room text,
    is_completed BOOLEAN,
    created_at timestamp,
    assigned_at timestamp,
    foreign key (student_id) references student(student_id) on delete cascade,
    foreign key (block_id) references block(block_id) on delete cascade,
    foreign key (assigned_worker_id) references workers(worker_id) on delete cascade,
    foreign key (category_id) references category(category_id) on delete cascade,
    foreign key (warden_id) references warden(warden_id) on delete cascade
);
`  
  await pool.query(users);
  await pool.query(block);
  await pool.query(student);
  await pool.query(warden);
  await pool.query(category);
  await pool.query(workers);
  await pool.query(complaint);
 
}

module.exports = {
  pool,
  initDatabase,
};
