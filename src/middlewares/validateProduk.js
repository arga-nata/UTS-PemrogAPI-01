const aturan = {
  nama_produk: (v) => Boolean(v),
  harga: (v) => Number.isInteger(v) && v >= 0,
  stok: (v) => Number.isInteger(v) && v >= 0,
  kategori_id: (v) => Number.isInteger(v) && v > 0,
  kode_produk: (v) => Boolean(v),
};

// Pesan kesalahan per field
const pesan = {
  nama_produk: "nama produk wajib diisi",
  harga: "harga wajib diisi",
  stok: "stok tidak valid",
  kategori_id: "kategori tidak valid",
  kode_produk: "kode produk tidak valid",
};

// parsial = false: semua field wajib (POST, PUT)
// parsial = true : hanya field yang dikirim diperiksa (PATCH)
function validasi(body, parsial) {
  const errors = [];

  for (const f of Object.keys(aturan)) {
    if (parsial && body[f] === undefined) continue; // PATCH: lewati
    if (!aturan[f](body[f])) errors.push(pesan[f]);
  }

  if (parsial && Object.keys(aturan).every((f) => body[f] === undefined)) {
    errors.push("minimal satu field harus dikirim");
  }
  return errors;
}

const cek = (parsial) => (req, res, next) => {
  const errors = validasi(req.body || {}, parsial);
  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: "Validasi gagal",
      errors,
    });
  }
  next();
};

module.exports = {
  validateProduk: cek(false), // POST dan PUT: semua wajib
  validatePatchProduk: cek(true), // PATCH: hanya yang dikirim
};
