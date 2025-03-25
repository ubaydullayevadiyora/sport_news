const { getAllLikes, getLikeById, createLike, updateLikes, deleteLikes } = require("../controllers/like.controller");

const router = require("express").Router();

router.get('/', getAllLikes);
router.get('/:id', getLikeById);
router.post('/', createLike);
router.put('/:id', updateLikes);
router.delete('/:id', deleteLikes);

module.exports = router;