const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

class AuthController {
  login = async (req, res, next) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      const user = await User.getByUsername(username);
      if (!user) {
        return res.json({ message: "Incorrect username.", status: "failed" });
      }
      if (!User.validatePasswordHash(password, user.password, user.salt)) {
        return res.json({ message: "Incorrect password.", status: "failed" });
      }

      const body = {
        userID: user.userID,
        username: user.username,
        email: user.email,
        userType: user.userType,
        studentID: user.studentID,
      };
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({ userID: user.userID, jwt: token, status: "success" });
    } catch (error) {
      return next(error);
    }
  };

  validateDuplicate = async (req, res, next) => {
    try {
      const isEmailDuplicate = (await User.getByEmail(req.body.email)) != null;
      const isUsernameDuplicate =
        (await User.getByUsername(req.body.username)) != null;
      const isMatricNoDuplicate =
        (await User.getByMatric(req.body.matricNo)) != null;

      if (isEmailDuplicate || isUsernameDuplicate || isMatricNoDuplicate) {
        let message;
        if (isEmailDuplicate) message = "Email already exists";
        if (isUsernameDuplicate) message = "Username already exists";
        if (isMatricNoDuplicate) message = "Matric Number already exists";
        return res.json({
          statue: "failed",
          message: message,
        });
      } else {
        return next();
      }
    } catch (error) {
      return next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      //create password hash & salt
      const { passwordHashed, salt } = User.createPasswordHashAndSalt(
        req.body.password
      );

      const user = {
        username: req.body.username,
        email: req.body.email,
        password: passwordHashed,
        salt: salt,
        userType: "student",
        name: req.body.name,
        matricNo: req.body.matricNo,
        addedDate: new Date(),
      };

      await User.register(user);
      const result = await User.getByUsername(req.body.username);

      //success
      const body = {
        userID: result.userID,
        username: result.username,
        email: result.email,
        userType: result.userType,
        studentID: result.studentID,
      };
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({ userID: result.userID, jwt: token, status: "success" });
    } catch (error) {
      if (error.code == "ER_DUP_ENTRY") {
        const sqlMessage = error.sqlMessage;
        let message = "Failed";
        if (sqlMessage.includes("matricNo"))
          message = "Matric Number Already Exists";
        if (sqlMessage.includes("username"))
          message = "Username Number Already Exists";
        if (sqlMessage.includes("email"))
          message = "Email Number Already Exists";

        return res.json({ status: "failed", message: message });
      }
      return next(error);
    }
  };
}

module.exports = new AuthController();
