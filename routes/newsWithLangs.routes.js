const { getAllNewsWithLangs, createNewsWithLang, deleteNewsWithLang } = require("../controllers/newsWithLangs.controller");

const router = require("express").Router();

router.get('/', getAllNewsWithLangs);
// router.get('/:id', getNewsWithLangsById);
router.post('/', createNewsWithLang);
// router.put('/:id', updateNewsWithLang);
router.delete('/:id', deleteNewsWithLang);

module.exports = router;