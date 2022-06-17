const express = require("express");
const RoomController = require("../controllers/roomController");
const router = express.Router();

router.get("/:id", RoomController.getRoom);
router.get("/:id/:roomId", RoomController.getRoomById);
router.post("/:id", RoomController.addRoom);
router.put("/:id", RoomController.updateRoom);
router.put("/changeActivation/:id", RoomController.changeActivation);
router.put("/updateOccupied/:id", RoomController.updateOccupied);
router.delete("/:id", RoomController.deleteRoom);

module.exports = router;
