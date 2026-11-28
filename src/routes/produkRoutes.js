const {
  getAllProduk,
  getProdukById,
  createProduk,
  updateProduk,
  patchProduk,
  deleteProduk,
  restoreProduk,
} = require("../controllers/produkController");
const parseId = require("../middlewares/parseId");
const {
  validateProduk,
  validatePatchProduk,
} = require("../middlewares/validateProduk");

const router = require("express").Router();

router.get("/", getAllProduk);
router.get("/:id", parseId, getProdukById);
router.post("/", validateProduk, createProduk);
router.put("/:id", parseId, validateProduk, updateProduk);
router.patch("/:id", parseId, validatePatchProduk, patchProduk);
router.delete("/:id", parseId, deleteProduk)
router.patch("/:id/restore", parseId, restoreProduk);

module.exports = router;
