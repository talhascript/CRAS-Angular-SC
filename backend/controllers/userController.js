const User = require("../models/user");

class UserController {
  getUser = async (req, res) => {
    const host = req.headers.host;
    const user = req.user;
    const result = await User.getById(user.userID);
    delete result.password;
    delete result.salt;
    result.imagePath = result.imagePath && `http://${host}/${result.imagePath}`;
    res.json(result);
  };

  updateEmailandName = async (req, res) => {
    const user = req.user;
    const { name, email } = req.body;
    const result = await User.updateEmailandName(user.studentID, name, email);
    res.json(result);
  };

  updatePassword = async (req, res) => {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    const result = await User.getById(user.userID);
    if (!User.validatePasswordHash(oldPassword, result.password, result.salt))
      return res.json({ success: false, reason: "Old Password is Wrong" });
    const { passwordHashed, salt } =
      User.createPasswordHashAndSalt(newPassword);
    const isSuccess = await User.updatePassword(
      user.userID,
      passwordHashed,
      salt
    );
    return res.json({ success: isSuccess });
  };

  updateImage = async (req, res) => {
    const host = req.headers.host;
    const user = req.user;
    const fileName = req.file.filename;

    const isSuccess = await User.updateProfileImage(user.studentID, fileName);
    if (!isSuccess) return res.json("");
    return res.json(`http://${host}/${fileName}`);
  };

  updateStudentApplicationStatus = async (req, res) => {
    const result = await User.updateStudentApplicationStatus(
      req.user.studentID
    );
    res.json(result);
  };
}

module.exports = new UserController();
