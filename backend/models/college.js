const database = require("../db");
const BaseModel = require("./BaseModel");

class College extends BaseModel {
  constructor() {
    super();
    if (this.instance) return this.instance;
    College.instance = this;
  }

  async get() {
    const rows = await database.query("SELECT * FROM college");

    return super.rowToArray(rows);
  }

  async getById(id) {
    const rows = await database.query(
      "SELECT * FROM college WHERE collegeID = ?",
      [id]
    );

    return super.rowToArray(rows[0]);
  }

  async post(college) {
    const rows = await database.query(
      "INSERT INTO college(collegeName, address, addedDate) VALUES(?,?,NOW())",
      [college.collegeName, college.address]
    );

    return super.rowToArray(rows);
  }

  async delete(id) {
    const rows = await database.query(
      "DELETE FROM college WHERE collegeID = ?",
      [id]
    );

    return super.rowToArray(rows);
  }

  async update(id, college) {
    const rows = await database.query(
      "UPDATE college SET collegeName = ?, address = ? WHERE collegeID = ?",
      [college.collegeName, college.address, id]
    );

    return super.rowToArray(rows);
  }
}

module.exports = new College();
