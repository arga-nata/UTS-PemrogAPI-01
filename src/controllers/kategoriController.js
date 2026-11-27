const kategoriRepository = require("../repositories/kategoriRepository");

const kategoriController = {
  async findAll(req, res) {
    const data = await kategoriRepository.findAll();
    return res.status(200).json({
      data,
      status: "success",
      message: "Daftar Kategori",
      count: data.length,
    });
  },

  async findById(req, res) {
    const id = req.params.id;
    const data = await kategoriRepository.findById(id);

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Kategori berhasil ditemukan",
      data,
    });
  },

  async create(req, res) {
    try {
      const data = await kategoriRepository.create(req.body);
      return res.status(201).json({
        data,
        status: "success",
        message: "Kategori berhasil dibuat",
      });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(409).json({
          status: "error",
          message: "Nama kategori sudah ada yang pakai",
        });
      }

      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan pada server",
      });
    }
  },

  async remove(req, res) {
    try {
      const id = req.params.id;
      const data = await kategoriRepository.remove(id);

      if (!data) {
        return res.status(404).json({
          status: "error",
          message: "Kategori tidak ditemukan",
        });
      }

      return res.status(204).send();
    } catch (error) {
      if (error.code === "23503") {
        return res.status(409).json({
          status: "error",
          message: "Kategori masih dipakai produk",
        });
      }

      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan pada server",
      });
    }
  },
};

module.exports = kategoriController;
