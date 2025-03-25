const { createReport, getAllReports, getReportById, deleteReport, updateReport } = require("../controllers/report.controller");

const router = require("express").Router();

router.post("/", createReport),
router.get("/", getAllReports),
router.get("/", getReportById)
router.delete("/:id", deleteReport),
router.put("/", updateReport)

module.exports = router