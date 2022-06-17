const express = require("express");
const applicationController = require("../controllers/applicationController");
const { UserAuthMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(UserAuthMiddleware);
router.get("/history/", applicationController.getAllApplicationHistory);
router.get("/", applicationController.getAllCurrentApplication);
router.put("/:id/", applicationController.updateApprovalApplication);
router.post("/", applicationController.addApplication);
router.get(
  "/studentHistory/",
  applicationController.getStudentApplicationHistory
);

module.exports = router;
