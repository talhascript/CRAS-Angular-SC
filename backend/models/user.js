const database = require("../db");
const crypto = require("crypto");

class User {
  constructor() {
    if (this.instance) return this.instance;
    User.instance = this;
  }

  async get() {
    const rows = await database.query(
      "SELECT userID, username, email, addedDate, userType, studentID FROM user"
    );

    return this.rowToArray(rows);
  }

  async getById(userID) {
    let rows;
    if (userID == 1)
      rows = await database.query("SELECT * FROM user WHERE userID = ? ", [
        userID,
      ]);
    else
      rows = await database.query(
        "SELECT * FROM user INNER JOIN student ON student.studentID=user.studentID WHERE user.userID = ? ",
        [userID]
      );

    return this.rowToArray(rows[0]);
  }

  async getByUsername(username) {
    const rows = await database.query("SELECT * FROM user WHERE username = ?", [
      username,
    ]);
    return this.rowToArray(rows[0]);
  }

  async getByMatric(matricNo) {
    const rows = await database.query(
      "SELECT * FROM student WHERE matricNo = ?",
      [matricNo]
    );
    return this.rowToArray(rows[0]);
  }

  async getByEmail(email) {
    const rows = await database.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    return this.rowToArray(rows[0]);
  }

  async register(user) {
    try {
      await database.query(
        "INSERT INTO student(name, matricNo) values(?, ?); " +
          "SET @id = LAST_INSERT_ID(); " +
          "INSERT INTO user(username, email, password, salt, userType, studentID, addedDate)" +
          "values(?, ?, ?, ?, ?, @id, NOW());",
        [
          user.name,
          user.matricNo,
          user.username,
          user.email,
          user.password,
          user.salt,
          user.userType,
        ]
      );
    } catch (error) {
      throw error;
    }
  }

  async updateEmailandName(studentId, name, email) {
    try {
      await database.query(
        "UPDATE student SET name = ? WHERE studentID = ?;" +
          "UPDATE user SET email = ? WHERE studentID = ?;",
        [name, studentId, email, studentId]
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async updatePassword(userId, password, salt) {
    try {
      await database.query(
        "UPDATE user SET password = ? , salt = ? WHERE userID = ?;",
        [password, salt, userId]
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateProfileImage(studentId, imageName) {
    try {
      await database.query(
        "UPDATE student SET imagePath = ?  WHERE studentID = ?;",
        [imageName, studentId]
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  // async update(id, user) {
  //   const fields = []
  //   const params = []
  //   for (const attribute in user) {
  //       fields.push('?? = ?')
  //       params.push(attribute, todo[attribute])
  //   }
  //   const stmt = `UPDATE todos SET ${fields.join(', ')} WHERE id = ?`
  //   return database.query(stmt, [...params, parseInt(id)])
  // }

  rowToArray(sqlRows) {
    if (!sqlRows) return null;
    return JSON.parse(JSON.stringify(sqlRows));
  }

  validatePasswordHash(password, hashedPassword, salt) {
    return (
      crypto
        .createHash("sha512")
        .update(password + salt)
        .digest("hex") == hashedPassword
    );
  }

  createPasswordHashAndSalt(password) {
    const salt = crypto.randomBytes(15).toString("hex");
    const passwordHashed = crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");
    return { passwordHashed: passwordHashed, salt: salt };
  }

  async updateStudentApplicationStatus(studentId) {
    try {
      await database.query(
        "UPDATE student SET application = ?  WHERE studentID = ?;",
        [1, studentId]
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new User();
