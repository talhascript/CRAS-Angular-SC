const express = require("express");
const { UserAuthMiddleware } = require("../middleware/authMiddleware");
const imageUploadMiddleware = require("../middleware/imageUploadMiddleware");
const router = express.Router();

const UserController = require("../controllers/userController");

//get current logged in user's data
router.use(UserAuthMiddleware);
router.get("/", UserController.getUser);
router.post("/updateEmailAndName", UserController.updateEmailandName);
router.post("/updatePassword", UserController.updatePassword);
router.post("/updateImage", imageUploadMiddleware, UserController.updateImage);
router.put(
  "/updateApplicationStatus",
  UserController.updateStudentApplicationStatus
);

module.exports = router;
