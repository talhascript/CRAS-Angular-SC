const express = require("express");
const CollegeController = require("../controllers/collegeController");
const router = express.Router();

router.get("/", CollegeController.getCollege);
router.get("/:id", CollegeController.getCollegeById);
router.post("/", CollegeController.addCollege);
router.put("/:id", CollegeController.updateCollege);
router.delete("/:id", CollegeController.deleteCollege);

module.exports = router;
