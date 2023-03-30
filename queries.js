import pool from "./lib/db_connection.js";
import pg from "pg";
const { Pool } = pg;
import { argv } from "node:process";
import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
const yargs = _yargs(hideBin(process.argv));

yargs.option({
  d: { demandOption: false, alias: "descripcion" },
  f: { demandOption: false, alias: "fecha" },
  m: { demandOption: false, alias: "monto" },
  c: { demandOption: false, alias: "cuenta" },
});

const params = yargs.argv;

// pool.connect();
const client = await pool.connect();

async function queries(query, mensaje, ...params) {
  // await pool.query("BEGIN");
  try {
    const resultado = await client.query(query, params);
    console.log(mensaje);
    console.table(resultado.rows);
    // await client.query('COMMIT');
  } catch (err) {
    // await client.query('ROLLBACK');
    console.log("Error", err);
  } finally {
    client.release();
  }
}

if (argv[2] == "insertar") {
  queries(
    "INSERT INTO transacciones (descripcion, fecha, monto, id_cuenta) VALUES ($1, $2, $3, $4) RETURNING *",
    "Transaccion agregada",
    params.d,
    params.f,
    params.m,
    params.c
  );
}

if (argv[2] == "ver") {
  queries("SELECT * FROM transacciones");
}
