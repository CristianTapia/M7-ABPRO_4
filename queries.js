import pool from "./lib/db_connection.js";
import pg from "pg";
const { Pool } = pg;
import { argv } from "node:process";
import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
const yargs = _yargs(hideBin(process.argv));
import dotenv from "dotenv";
//dotenv.config();

yargs.option({
  n: { demandOption: false, alias: "descripcion" },
  r: { demandOption: false, alias: "fecha" },
  c: { demandOption: false, alias: "monto" },
  l: { demandOption: false, alias: "cuenta" },
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

queries();
