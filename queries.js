import pool from "./lib/db_connection.js";

pool.connect();

async function queries() {
  // await pool.query('BEGIN');
  try {
    let resultado = await pool.query("SELECT * FROM usuarios");
    console.table(resultado.rows);
  } catch (e) {
    console.log(e);
  }
}

queries();
