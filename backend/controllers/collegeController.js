const College = require("../models/college");

class CollegeController {
  constructor() {
    if (this.instance) return this.instance;
    CollegeController.instance = this;
  }

  getCollege = async (req, res) => {
    const result = await College.get();
    res.json(result);
  };

  getCollegeById = async (req, res) => {
    const id = req.params["id"];
    const result = await College.getById(id);
    res.json(result);
  };

  addCollege = async (req, res) => {
    const { collegeName, address } = req.body;
    const result = await College.post(collegeName, address);
    res.json(result);
  };

  updateCollege = async (req, res) => {
    const id = req.params["id"];
    const college = req.body;
    const result = await College.update(id, college);
    res.json(result);
  };

  deleteCollege = async (req, res) => {
    const id = req.params["id"];
    const result = await College.delete(id);
    res.json(result);
  };
}

module.exports = new CollegeController();
