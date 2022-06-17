const Room = require("../models/room");

class RoomController {
  constructor() {
    if (this.instance) return this.instance;
    RoomController.instance = this;
  }

  getRoom = async (req, res) => {
    const id = req.params["id"];
    const result = await Room.get(id);
    res.json(result);
  };

  getRoomById = async (req, res) => {
    const id = req.params["id"];
    const roomId = req.params["roomId"];
    const result = await Room.getById(roomId);
    res.json(result);
  };

  addRoom = async (req, res) => {
    const collegeid = req.params["id"];
    const { roomName, roomType, capacity } = req.body;
    const result = await Room.post(collegeid, roomName, roomType, capacity);
    res.json(result);
  };

  updateRoom = async (req, res) => {
    const id = req.params["id"];
    const { roomName, roomType, capacity } = req.body;
    const result = await Room.update(id, roomName, roomType, capacity);
    res.json(result);
  };

  deleteRoom = async (req, res) => {
    const roomId = req.params["id"];
    const result = await Room.delete(roomId);
    res.json(result);
  };

  changeActivation = async (req, res) => {
    const id = req.params["id"];
    const { activated } = req.body;
    const result = await Room.changeActivation(id, activated);
    res.json(result);
  };

  updateOccupied = async (req, res) => {
    const id = req.params["id"];
    const result = await Room.updateOccupied(id);
    res.json(result);
  };
}
module.exports = new RoomController();
