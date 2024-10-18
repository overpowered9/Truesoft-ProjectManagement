const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/middle_admin");
const userController = require("../controllers/userController");

const decodeTokenMiddleware = require("../middleware/decodeTokenMiddleware");

router.get("/", userController.getallUsers);
router.get(
  "/:id",
  decodeTokenMiddleware,
  userController.getallUsersinworkspace
);
module.exports = router;
