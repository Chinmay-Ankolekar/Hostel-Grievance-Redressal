const Pool = require("pg").Pool;

const pool = new Pool({
   user: "postgres",
   password: "chinmay.1221",
   host: "localhost",
   port: 5432,
   database: "hostel"
});

async function initDatabase (){
    
   await pool.query(`CREATE TABLE if not exists complaint (
        complaint_id SERIAL PRIMARY KEY,
        complaint_description VARCHAR(40),
        room VARCHAR(20),
        is_completed BOOLEAN,
        created_at DATE,
        assigned_at DATE
    );`)
}

module.exports = {
    pool,
    initDatabase
}