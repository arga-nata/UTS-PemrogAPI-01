require("dotenv").config();

const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function refreshDatabase() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `);

    const schema = fs.readFileSync(
      path.join(__dirname, "../sql/schema.sql"),
      "utf8"
    );

    const seed = fs.readFileSync(
      path.join(__dirname, "../sql/seed.sql"),
      "utf8"
    );

    await client.query(schema);
    console.log("Schema berhasil dibuat");

    await client.query(seed);
    console.log("Seed berhasil dimasukkan");

    await client.query("COMMIT");

    console.log("Database berhasil di-refresh!");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Refresh database gagal:", error);

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

refreshDatabase();