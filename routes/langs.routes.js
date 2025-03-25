const { addNewLang, getAllLangs, deleteLangById } = require("../controllers/langs.controller");

const router = require("express").Router();

router.post("/", addNewLang),
router.get("/", getAllLangs),
router.delete("/:id", deleteLangById),

module.exports = router