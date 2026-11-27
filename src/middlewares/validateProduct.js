const aturan = {
  kategori_id: (v) => Number.isInteger(v),
  kode_produk: (v) => Boolean(v),
  nama_produk: (v) => Boolean(v),
  harga: (v) => Number.isInteger(v) && v > 0,
  stok: (v) => Number.isInteger(v) && v >= 0,
};

const pesan = {
  kategori_id: 'Kategori tidak boleh kosong',
  kode_produk: 'Kode Produk tidak boleh kosong',
  nama_produk: 'Nama Produk tidak boleh kosong',
  harga: 'Harga harus lebih dari 0',
  stok: 'Stok minimal 0',
};

function validasi(body, parsial) {
  const errors = [];

  for (const f of Object.keys(aturan)) {
    if (parsial && body[f] === undefined) continue;
    if (!aturan[f](body[f])) errors.push(pesan[f]);
  }

  if (parsial && Object.keys(aturan).every((f) => body[f] === undefined)) {
    errors.push('minimal satu field harus dikirim');
  }
  return errors;
}

const cek = (parsial) => (req, res, next) => {
  const errors = validasi(req.body || {}, parsial);
  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Validasi gagal',
      errors,
    });
  }
  next();
};

module.exports = {
  validateProduct: cek(false),
  validatePatch: cek(true),
};
