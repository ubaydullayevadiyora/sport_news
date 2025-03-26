const { getAllTags, createTag } = require("../controllers/tags.controller");

const router = require("express").Router();

router.get('/', getAllTags);
// router.get('/:id', getTagsById);
router.post('/', createTag);
// router.put('/:id', updateT);
// router.delete('/:id', deleteCategory);

module.exports = router;