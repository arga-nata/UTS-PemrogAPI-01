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
}

module.exports = new KategoriRepository();
