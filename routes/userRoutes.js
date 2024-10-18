const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/middle_admin");
const userController = require("../controllers/userController");

const decodeTokenMiddleware = require("../middleware/decodeTokenMiddleware");

app.use("/", decodeTokenMiddleware, userController.getallUsers);
app.use("/:id", decodeTokenMiddleware, userController.getallUsersinworkspace);
module.exports = router;
