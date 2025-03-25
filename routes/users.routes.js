const { createUser, getAllUsers, getUserById, deleteUser, updateUser } = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/", createUser),
router.get("/", getAllUsers),
router.get("/", getUserById)
router.delete("/:id", deleteUser),
router.put("/", updateUser)

module.exports = router