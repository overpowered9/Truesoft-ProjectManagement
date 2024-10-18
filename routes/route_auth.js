const express = require("express");
const adminAuth = require("../middleware/middle_admin");
const {
  register,
  login,
  adminlogin,
  leadlogin,
} = require("../controllers/controller_auth");
const router = express.Router();

router.post("/register", adminAuth, register);
router.post("/logintm", login);
router.post("/logintl", leadlogin);
router.post("/loginadmin", adminlogin);

module.exports = router;
