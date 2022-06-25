const database = require("../db");

class Room {
  constructor() {
    if (this.instance) return this.instance;
    Room.instance = this;
  }

  async get(id) {
    const rows = await database.query(
      "SELECT * FROM room WHERE collegeID = ?",
      [id]
    );

    return this.rowToArray(rows);
  }

  async post(collegeId, room) {
    const rows = await database.query(
      "INSERT INTO room(roomName,collegeID,addedDate,roomType,activated,capacity,occupied) VALUES(?,?,NOW(),?,1,?,0)",
      [room.roomName, collegeId, room.roomType, room.capacity]
    );

    return this.rowToArray(rows[0]);
  }

  async getById(id) {
    const rows = await database.query("SELECT * FROM room WHERE roomID = ?", [
      id,
    ]);

    return this.rowToArray(rows[0]);
  }

  async update(roomId, room) {
    const rows = await database.query(
      "UPDATE room SET roomName = ?, roomType = ?, capacity = ? WHERE roomID = ?",
      [room.roomName, room.roomType, room.capacity, roomId]
    );

    return this.rowToArray(rows);
  }

  async delete(id) {
    const rows = await database.query("DELETE FROM room WHERE roomID = ?", [
      id,
    ]);
    return this.rowToArray(rows[0]);
  }

  async changeActivation(id, activated) {
    const rows = await database.query(
      "UPDATE room SET activated = ? WHERE roomID = ?",
      [activated, id]
    );

    return this.rowToArray(rows);
  }

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows));
  }

  async updateOccupied(id) {
    const rows = await database.query(
      "UPDATE room SET occupied = occupied + 1 WHERE roomID = ?",
      [id]
    );

    return this.rowToArray(rows);
  }
}

module.exports = new Room();
