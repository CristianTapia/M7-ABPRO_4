import pool from "./lib/db_connection.js";
import pg from "pg";
import cursor from "pg-cursor";
const { Pool } = pg;
import { argv } from "node:process";
import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
const yargs = _yargs(hideBin(process.argv));
import dotenv from "dotenv";
//dotenv.config();

yargs.option({
  d: { demandOption: false, alias: "descripcion" },
  f: { demandOption: false, alias: "fecha" },
  m: { demandOption: false, alias: "monto" },
  c: { demandOption: false, alias: "cuenta" },
});

const params = yargs.argv;

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


async function query() {
  try {
    const cursor = await pool.query('SELECT * FROM transacciones WHERE id_cuenta=$1 limit 10', [1]);
    console.table(cursor.rows)
  } catch (err) {
    console.log(err)
  }

}


query()
