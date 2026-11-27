const pool = require("../config/db");

class KategoriRepository {
  async findAll() {
    const query = await pool.query("SELECT * FROM kategori");
    return query.rows;
  }

  async findById(id) {
    const query = await pool.query("SELECT * FROM kategori WHERE id = $1", [
      id,
    ]);

    return query.rows[0];
  }

  async create(data) {
    const query = await pool.query(
      "INSERT INTO kategori (nama_kategori, deskripsi) VALUES ($1, $2) RETURNING *",
      [data.nama_kategori, data.deskripsi],
    );

    return query.rows[0];
  }

  async remove(id) {
    const query = await pool.query(
      "DELETE FROM kategori WHERE id = $1 RETURNING *",
      [id],
    );
    return query.rows[0];
  }
}

module.exports = new KategoriRepository();
