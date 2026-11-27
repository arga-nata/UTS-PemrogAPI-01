function validasiKategori(req, res, next) {
  if (!req.body?.nama_kategori)
    return res.status(400).json({
      status: 'error',
      message: 'Nama Kategori Tidak Boleh Kosong',
    });
  next();
}

module.exports = validasiKategori;
