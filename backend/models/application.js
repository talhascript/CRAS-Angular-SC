const database = require("../db");
const BaseModel = require("./BaseModel.js");

class Application extends BaseModel {
  constructor() {
    super();
    if (this.instance) return this.instance;
    Application.instance = this;
  }
  async getAllApplicationHistory() {
    const rows = await database.query(
      "SELECT * FROM application " +
        "JOIN student ON student.studentID = application.studentID " +
        "JOIN room ON application.roomID = room.roomID " +
        "JOIN college ON room.collegeID = college.collegeID " +
        "WHERE status != 'pending'"
    );

    return rows;
  }

  async getAllCurrentApplication() {
    const rows = await database.query(
      "SELECT * FROM application " +
        "JOIN student ON student.studentID = application.studentID " +
        "JOIN room ON application.roomID = room.roomID " +
        "JOIN college ON room.collegeID = college.collegeID " +
        "WHERE status = 'pending'"
    );

    return rows;
  }

  async updateApprovalApplication(id, status, studentID, roomID) {
    try {
      const result = await database.query(
        "UPDATE application SET status = ?, processedDate = NOW() WHERE applicationID = ?;",
        [status, id]
      );
      if (status == "unapproved") {
        await database.query(
          `UPDATE student SET application = 0 WHERE studentID = ?;
          UPDATE room SET occupied = occupied - 1 WHERE roomID = ?;`,
          [studentID, roomID]
        );
      }
      return super.rowToArray(result);
    } catch (error) {
      throw error;
    }
  }

  async addApplication(studentID, roomID) {
    const rows = await database.query(
      `INSERT INTO application(applicationDate,processedDate,studentID,roomID, status)
       VALUES(NOW(),null,?,?,'pending')`,
      [studentID, roomID]
    );

    return super.rowToArray(rows[0]);
  }

  async getStudentApplicationHistory(studentID) {
    console.log(studentID);
    const rows = await database.query(
      "SELECT * FROM application " +
        "JOIN student ON student.studentID = application.studentID " +
        "JOIN room ON application.roomID = room.roomID " +
        "JOIN college ON room.collegeID = college.collegeID " +
        "WHERE application.studentID = ?",
      [studentID]
    );

    return rows;
  }
}
module.exports = new Application();
