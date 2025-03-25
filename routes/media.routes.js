const { getAllMedia, createMedia, updateMedia, deleteMedia, getMediaById } = require("../controllers/media.controller");

const router = require("express").Router();

router.get('/', getAllMedia);
router.get('/:id', getMediaById);
router.post('/', createMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

module.exports = router;