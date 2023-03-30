import pool from "./lib/db_connection.js";
import Cursor from "pg-cursor";
import _yargs from "yargs";
import { hideBin } from "yargs/helpers";
const yargs = _yargs(hideBin(process.argv));

//dotenv.config();

yargs.option({
  d: { demandOption: false, alias: "descripcion" },
  f: { demandOption: false, alias: "fecha" },
  m: { demandOption: false, alias: "monto" },
  c: { demandOption: false, alias: "cuenta" },
});

async function queryCuentas() {
  try {
    const client = await pool.connect();
    const text = "SELECT saldo FROM cuentas limit 10";

    const cursor = client.query(new Cursor(text));

    cursor.read(100, (err, rows) => {
      console.log(rows);
      cursor.close(() => {
        client.release();
      });
    });
  } catch (err) {
    console.log(err);
  }
}

queryCuentas();
