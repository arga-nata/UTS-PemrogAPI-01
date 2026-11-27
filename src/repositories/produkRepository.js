const { Result } = require("pg");
const db = require("../config/db");

class ProdukRepository {
  static async findAll() {
    const { rows } = await db.query(
      `SELECT kategori_id, 
       kode_produk, nama_produk,
       harga, stok, created_at, deleted_at 
       FROM produk WHERE deleted_at IS NULL`,
    );
    return rows;
  }

  static async countAll() {
    const { rows } = await db.query(
      "SELECT COUNT(*) AS total FROM produk WHERE deleted_at IS NULL",
    );
    return rows[0].total;
  }

  static async findById(id) {
    const { rows } = await db.query(
      "SELECT * FROM produk WHERE id = $1 AND deleted_at IS NULL",
      [id],
    );
    return rows[0] || null;
  }

  static async findByKategoryId(kategoryId) {
    const { rows } = await db.query(
      "SELECT * FROM produk WHERE kategori_id = $1 AND deleted_at IS NULL",
      [kategoryId],
    );
    return rows;
  }

  static async create({ nama_produk, harga, stok, kategori_id, kode_produk }) {
    const { rows } = await db.query(
      `INSERT INTO produk (nama_produk, harga, stok, kategori_id, kode_produk) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nama_produk, harga, stok, kategori_id, kode_produk],
    );

    return rows[0] || null;
  }

  static #allowFields = ["nama_produk", "harga", "stok", "kategori_id","kode_produk"];
  static async partialUpdate(id, data) {
    const keys = Object.keys(data).filter((key) =>
      ProdukRepository.#allowFields.includes(key),
    );

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");

    const values = [...keys.map((key) => data[key]), id];

    const { rows } = await db.query(
      `UPDATE produk
     SET ${setClause}
     WHERE id = $${values.length}
     AND deleted_at IS NULL RETURNING *`,
      values,
    );

    return rows[0] || null;
  }

  static async update(
    id,
    { nama_produk, harga, stok, kategori_id, kode_produk },
  ) {
    const { rows } = await db.query(
      `UPDATE produk SET 
     nama_produk = $1,
     harga = $2,
     stok = $3,
     kategori_id = $4,
     kode_produk = $5
     WHERE id = $6 AND deleted_at IS NULL
     RETURNING *`,
      [nama_produk, harga, stok, kategori_id, kode_produk, id],
    );
    return rows[0] || null;
  }

  static async softDelete(id) {
    const { rowCount } = await db.query(
      "UPDATE produk SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING *",
      [id],
    );
    return rowCount > 0;
  }

  static async restore(id) {
    const { rows } = await db.query(
      "UPDATE produk SET deleted_at = NULL WHERE id = $1 AND deleted_at IS NOT NULL RETURNING *",
      [id],
    );
    return rows[0] || null;
  }
}

module.exports = ProdukRepository;
