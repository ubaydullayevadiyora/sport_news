const router = require("express").Router();

const langsRoute = require("./langs.routes")
const newsRoute = require("./news.routes")
const categoryRoute = require("./category.routes")
const commentRoute = require("./comment.routes")
const likeRoute = require("./like.routes")
const mediaRoute = require("./media.routes")
const newsWithLangsRoute = require("./newsWithLangs.routes")
const reportRoute = require("./report.routes")
const userRoutes = require("./users.routes")

router.use("/langs", langsRoute)
router.use("/news", newsRoute)
router.use("/category", categoryRoute)
router.use("/comment", commentRoute)
router.use("/like", likeRoute)
router.use("/media", mediaRoute)
router.use("/newsWithLangs", newsWithLangsRoute)
router.use("/report", reportRoute)
router.use("/users", userRoutes)

module.exports = router