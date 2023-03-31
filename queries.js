import pool from "./lib/db_connection.js";
import pg from "pg";
import Cursor from "pg-cursor";
const { Pool } = pg;
import { argv } from "node:process";
import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
const yargs = _yargs(hideBin(process.argv));

yargs.option({
  f: { demandOption: false, alias: "fecha" },
  m: { demandOption: false, alias: "monto" },
  c: { demandOption: false, alias: "cuenta" },
  z: { demandOption: false, alias: "descripcion" },
  i: { demandOption: false, alias: "id_cuenta" },
});

const params = yargs.argv;
const client = await pool.connect();

async function queryInsertar(query, mensaje, ...params) {
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

async function queryCuenta(){
  try{
  const client= await pool.connect();
  const text= "SELECT * FROM transacciones WHERE id_cuenta=$1 limit 10";
  const values= [3]

  const cursor= client.query(new Cursor(text,values))
  cursor.read(10, (err, rows) => {
    console.table(rows);
    cursor.close(() => {
      client.release();
    });
  });
}catch (err) {
  console.log(err);
}
}

async function queryCuentas() {
  try {
    const client = await pool.connect();
    const text = "SELECT saldo FROM cuentas limit 10";
    const cursor = client.query(new Cursor(text));

    cursor.read(100, (err, rows) => {
      console.table(rows);
      cursor.close(() => {
        client.release();
      });
    });
  } catch (err) {
    console.log(err);
  }
}

async function query() {
  try {
    const cursor = await pool.query(
      "SELECT * FROM transacciones WHERE id_cuenta=$1 limit 10",
      [1]
    );
    console.table(cursor.rows);
  } catch (err) {
    console.log(err);
  }
}

if (argv[2] == "insertar") {
  queryInsertar(
    "INSERT INTO transacciones (descripcion, fecha, monto, id_cuenta) VALUES ($1, $2, $3, $4) RETURNING *",
    "Transaccion agregada correctamente",
    params.z,
    params.f,
    params.m,
    params.c
  );
}

if (argv[2] == "ver") {
  queryCuenta();
}

if (argv[2] == "cuentas") {
  queryCuentas();
}