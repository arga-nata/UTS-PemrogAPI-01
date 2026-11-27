const express = require('express');
const router = express.Router();
const kategoriController = require('../controllers/kategoriController');
const parseId = require('../middlewares/parseId.js');
const validasiKategori = require('../middlewares/validateKategori.js');

router.get('/', kategoriController.findAll);
router.get('/:id', parseId, kategoriController.findById);
router.post('/', validasiKategori, kategoriController.create);
router.delete('/:id', parseId, kategoriController.remove);

module.exports = router;
