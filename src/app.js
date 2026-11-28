const express = require("express");
const route = require("./routes/index.");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());
app.use(route);
app.use(errorMiddleware);

// TODO: aktifkan 2 baris ini kalau kategoriRoutes.js & produkRoutes.js
// dari Arganata (C) dan Eko (D) sudah ada di src/routes/
// const kategoriRoutes = require("./routes/kategoriRoutes");
// const produkRoutes = require("./routes/produkRoutes");
// app.use("/api/kategori", kategoriRoutes);
// app.use("/api/produk", produkRoutes);

// 404 - route tidak dikenal
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route tidak ditemukan",
  });
});

// error handler terpusat
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "error",
      message: "JSON tidak valid",
    });
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
  });
});

module.exports = app;
