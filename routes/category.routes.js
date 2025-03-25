const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");

const router = require("express").Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;