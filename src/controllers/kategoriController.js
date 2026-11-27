const kategoriRepository = require("../repositories/kategoriRepository");

const kategoriController = {
  async findAll(req, res) {
    const data = await kategoriRepository.findAll();
    return res.status(200).json({
      data,
      status: "success",
      message: "Daftar kategori",
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
};

module.exports = kategoriController;
