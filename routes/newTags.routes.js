const { getAllNewsTags, createNewsTag } = require("../controllers/newTags.controller");

const router = require("express").Router();

router.get('/', getAllNewsTags);
// router.get('/:id', getCategoryById);
router.post('/', createNewsTag);
// router.put('/:id', updateCategory);
// router.delete('/:id', deleteCategory);

module.exports = router;