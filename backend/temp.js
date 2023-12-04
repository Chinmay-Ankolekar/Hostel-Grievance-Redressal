const Pool = require("pg").Pool;

const pool = new Pool({
   user: "postgres",
   password: "example",
   port: 5432,
   database: "postgres",
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

async function a() {
    try {
        
        const res = await pool.query('SELECT NOW()')
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

a()

