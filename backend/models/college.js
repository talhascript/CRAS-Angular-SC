const database = require("../db");

class College {
  constructor() {
    if (this.instance) return this.instance;
    College.instance = this;
  }

  async get() {
    const rows = await database.query("SELECT * FROM college");

    return this.rowToArray(rows);
  }

  async getById(id) {
    const rows = await database.query(
      "SELECT * FROM college WHERE collegeID = ?",
      [id]
    );

    return this.rowToArray(rows[0]);
  }

  async post(collegename, address) {
    const rows = await database.query(
      "INSERT INTO college(collegeName, address, addedDate) VALUES(?,?,NOW())",
      [collegename, address]
    );

    return this.rowToArray(rows);
  }

  async delete(id) {
    const rows = await database.query(
      "DELETE FROM college WHERE collegeID = ?",
      [id]
    );

    return this.rowToArray(rows);
  }

  async update(id, college) {
    const rows = await database.query(
      "UPDATE college SET collegeName = ?, address = ? WHERE collegeID = ?",
      [college.collegeName, college.address, id]
    );

    return this.rowToArray(rows);
  }

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows));
  }
}

module.exports = new College();
