const { getAllNews, createNews, deleteNews, getNewsById, updateNews } = require("../controllers/news.controller");

const router = require("express").Router();

router.post("/", createNews),
router.get("/", getAllNews),
router.get("/", getNewsById)
router.delete("/:id", deleteNews),
router.put("/", updateNews)

module.exports = router