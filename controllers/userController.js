const User = require("../models/User"); // Adjust the path as necessary

exports.getallUsers = async (req, res) => {
  try {
    const users = await User.find(); // Adjust the fields as necessary
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching users" });
  }
};
