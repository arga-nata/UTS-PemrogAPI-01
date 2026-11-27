const express = require("express");
const router = express.Router();
const kategoriController = require("../controllers/kategoriController");

router.get("/", kategoriController.findAll);
router.get("/:id", kategoriController.findById);
router.post("/", kategoriController.create);
router.delete("/:id", kategoriController.remove);

module.exports = router;
