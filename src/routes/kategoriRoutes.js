const express = require('express');
const router = express.Router();
const kategoriController = require('../controllers/kategoriController');
const parseId = require('../middlewares/parseId.js');
const validasiKategori = require('../middlewares/validateKategori.js');
const { getProdukByKategory } = require('../controllers/produkController.js');

router.get('/', kategoriController.findAll);
router.get('/:id/produk', parseId, getProdukByKategory)
router.get('/:id', parseId, kategoriController.findById);
router.post('/', validasiKategori, kategoriController.create);
router.delete('/:id', parseId, kategoriController.remove);

module.exports = router;
